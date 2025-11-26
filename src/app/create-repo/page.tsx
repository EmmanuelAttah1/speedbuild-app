"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { NavBar } from "../components/navbar/navbar";
import { Button } from "../components/button/button";

import styles from "../library/style.module.css"
import { Input } from "../components/input/input";
import { Select } from "../components/select/select";
import { useEffect, useState } from "react";
import { manageServerCall } from "@/api/api";


const AskDeletePermission=()=>{
    const [showPrompt, setShowPrompt] = useState<boolean>(false)
    return (
        <div>
            <Button label={"hello"} background_color={"#FF0000"} color={"#000000"} onClick={()=>{setShowPrompt(true)}}/>
            {showPrompt&&<div>
                <p>Are you sure</p>
                <div className={styles.btn_row}>
                    <div className={`${styles.btn_container} ${styles.btn_end}` }>

                        <Button 
                            border_radius 
                            label={"Cancel"} 
                            background_color={"#2B3036"} 
                            color={"#ffffff"}
                            onClick={()=>{setShowPrompt(false)}}
                        />
                        <Button loading={false} onClick={()=>{}} border_radius label={"yes"} background_color={"#0A80ED"} color={"#ffffff"}/>
                    </div>
                </div>
            </div>}
        </div>
    )
}
const capitalizeString=(text:string)=>{
    if(text==="read write"){
        return "Read and Write"
    }
    return text.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
}
const RepoType=(props:{name:string, setActive:()=>void, active:boolean})=>{
    const class_name = props.active? `${styles.repo_type} ${styles.repo_type_active}` : styles.repo_type
    return (
        <div className={class_name} onClick={props.setActive}>{props.name}</div>
    )
}

const Collaborator=(props:{
    name:string,
    permission:string,
    action:string,
    actionFunc?:()=>void
    id?:number,
    collaborators?:CollaboratorType[],
    updateCollaborators?:(data:CollaboratorType[])=>void,
})=>{
    const [editing, setEditing] = useState<boolean>(false)
    const [selectedPermission,setPermission] = useState<string>(props.permission)
    const [loading, setLoading] = useState<boolean>(false)

    const findCollaborator=(id:number)=>{
        return props.collaborators?.find(e=>{
            return e.id === id
        })

    }

    const updatePermission=()=>{
        if(selectedPermission.length>0 && props.permission !== selectedPermission && props.id){
            setLoading(true)
            manageServerCall("post","collaborators/",{},{
                action:"update",
                permission:selectedPermission,
                id:props.id.toString()
            },true)
            .then(res=>{
                console.log(res);
                setLoading(false)
                const collaboratorData = [...props.collaborators as CollaboratorType[]]
                const current = findCollaborator(props.id as number)
                if (current){
                    const index = collaboratorData.indexOf(current)
                    current.permission = selectedPermission
                    collaboratorData[index] = current
                    if(props.updateCollaborators){props.updateCollaborators(collaboratorData)}
                    setEditing(false)
                }
            })
        }
    }

    const deleteCollaborator=()=>{
        // delete collaborator
        if(props.id === 0){
            if(props.actionFunc){props.actionFunc()}
        }else{
            let collaboratorData = [...props.collaborators as CollaboratorType[]]
            collaboratorData = collaboratorData.filter(e=>{return e.id !== props.id})
            if(props.updateCollaborators){props.updateCollaborators(collaboratorData)}

            manageServerCall("post","collaborators/",{},{
                action:"delete",
                id:props.id?.toString()
            },true)
            .then(res=>{
                console.log(res);
            })
        }
    }

    return (
        <div className={styles.collaborator}>
            <div className={styles.collaborator_left}>
                <p className={styles.collaborator_name}>{props.name}</p>
                {editing?
                    <div className={styles.collaborator_editor}>
                        <Select 
                            option={["Read Only","Read and Write"]} 
                            defaultSelection={capitalizeString(selectedPermission)}
                            onSelect={(val)=>{
                                console.log(val);
                                
                                setPermission(val)
                            }}
                        />
                        <div className={styles.btn_container}>
                            <Button 
                                border_radius 
                                label={"Cancel"} 
                                background_color={"#2B3036"} 
                                color={"#ffffff"}
                                onClick={()=>{setEditing(false)}}
                            />
                            <Button 
                                loading={loading} 
                                onClick={updatePermission} 
                                border_radius label={"Update"} 
                                background_color={"#0A80ED"} 
                                color={"#ffffff"}
                                />
                        </div>
                    </div>
                :
                    <p className={styles.collaborator_permission} onClick={()=>{
                        if(props.action !== "remove"){
                            setEditing(true)
                        }
                    }}>Permission : {capitalizeString(props.permission)}</p>
                }
            </div>
            {!editing&&<div className={styles.collaborator_right}>
                {
                    props.action == "owner"?
                        <p>Owner</p>
                    :
                    <div className={styles.collaborator_icon} onClick={deleteCollaborator}></div>
                }
            </div>}
        </div>
    )
}

type CollaboratorType = {
    name:string,
    permission:string,
    id:number
}

type EmailSuggestion={
    users : string[]
}


const ManageRepoPage=()=>{
    const router = useRouter()

    const [addCollaboratorData, setAddCollaboratorData] = useState<{email:string,permission:string}>({
        email:"",
        permission:"Select Permission"
    })

    const [pendingInvites, setPendingInvites] = useState<CollaboratorType[]>([])
    const [activeCollaborators,setActiveCollaborators] = useState<CollaboratorType[]>([])
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [formLoading,setFormLoading] = useState<boolean>(false)
    const [editing,setIsediting] = useState<boolean>(false)
    const [repoId, setRepoId] = useState<string|null>()

    const [repoInfo,setRepoInfo] = useState<{
        name:string,
        description:string,
        is_private:boolean,
    }>({
        name:"",
        description:"",
        is_private:false,
    })

    const sendInvite=()=>{
        const name = addCollaboratorData.email
        const permission = addCollaboratorData.permission

        //TODO: Validate email address

        if(name.length > 0 && permission.length > 0 && permission != "Select permission"){
            const allInvites = [...pendingInvites]
            allInvites.push({
                name:name,
                permission:permission,
                id:0
            })
            setPendingInvites(allInvites)

            setAddCollaboratorData({email:"",permission:"Select Permission"})}
    }

    const getEmailSuggestions=(email:string)=>{
        manageServerCall("get","get-user/",{"email":email},{},true)
        .then(res=>{
            const data = res as EmailSuggestion
            setSuggestions(data.users)
        })
    }

    const cancelInvite=(invite:CollaboratorType)=>{
        let allInvites = [...pendingInvites]
        allInvites = allInvites.filter(e=>{return e !== invite})
        setPendingInvites(allInvites)
    }

    const createRepo=()=>{
        console.log(repoInfo);
        setFormLoading(true)

        const method = editing ? "put" : "post"
        const endpoint = editing ? "repo/"+repoId+"/" : "repo/"

        const data:Record<string,string | boolean> = {
            name:repoInfo.name,
            description : repoInfo.description,
            private:repoInfo.is_private,
        }

        if(pendingInvites.length > 0){
            data["people_with_access"] = JSON.stringify(pendingInvites)
        }
        manageServerCall(method,endpoint,{},data,true)
        .then(res=>{
            console.log(res);

            router.push("/repo")
        })
        .catch(err=>{
            setFormLoading(false)
            alert(err)
        })
    }

    const updateRepoInfo=(key:string,value:string | boolean)=>{
        const data = {...repoInfo}
        data[key] = value
        setRepoInfo(data)
    }

    const params = useSearchParams()

    useEffect(()=>{
        if (params.has("id")){
            const id = params.get("id");
            setIsediting(true)

            setRepoId(id)

            // get repo info
            manageServerCall("get","repo/"+id+"/",{action:"info"},{},true)
            .then(res=>{
                const data = res.data
                setRepoInfo({
                    name:data.name,
                    description:data.description,
                    is_private:data.private
                })
            })

            // get repo collaborators
            manageServerCall("get","collaborators/",{repo:id as string},{},true)
            .then(res=>{
                const data = res.collaborators
                setPendingInvites(data.filter(e=>{return e.invite_accepted===false}))
                setActiveCollaborators(data.filter(e=>{return e.invite_accepted===true}))
            })
        }
    },[])

    return (
        <>
            <NavBar router={router}/>
            <div className="MainContainer">
                <div className="MainBody_wide center">
                    <div className="MainBody no-padding-top">
                        <div className={styles.feature_left}>
                            <div className={styles.library_header}>
                                <h1>Create New Repository</h1>
                            </div>
                            {/* <AskDeletePermission/> */}
                            <div className={styles.customForm}>
                                <Input label={""} name="name" placeholder="Repository name" value={repoInfo.name} updateValue={(_,val)=>{
                                    updateRepoInfo("name",val)
                                }}/>
                                <Input label={""} name="description" placeholder="Repository description" textarea={true} value={repoInfo.description} updateValue={(_,val)=>{
                                    updateRepoInfo("description",val)
                                }}/>
                                <div className={styles.btn_container}>
                                    <RepoType name={"Public"} setActive={function (): void {
                                        updateRepoInfo("is_private",false)
                                    } } active={!repoInfo.is_private}/>
                                    <RepoType name={"Private"} setActive={function (): void {
                                        updateRepoInfo("is_private",true)
                                    } } active={repoInfo.is_private}/>
                                </div>
                                <p className={styles.upgrade_text}>Private repositories are only available on paid plans. {"<a href='#'> Upgrade </a>"}</p>
                                
                                <div className={styles.invite_collaborators}>
                                    <h1>Invite Collaborators</h1>
                                    <div className={styles.collaborators_container}>
                                        <div>
                                            <p>Pending Invite</p>

                                            <div className={styles.invite_section}>
                                                <div>
                                                    <Input 
                                                        label={""} 
                                                        placeholder="User email" 
                                                        name="email"
                                                        value={addCollaboratorData.email}
                                                        updateValue={(_,value)=>{
                                                            const formData = {...addCollaboratorData}
                                                            formData['email'] = value
                                                            setAddCollaboratorData(formData)
                                                            getEmailSuggestions(value)
                                                        }}
                                                    />
                                                    {suggestions.length>0&&<div className={styles.email_suggestion}>
                                                        {suggestions.map((e,index)=>(
                                                            <p 
                                                                key={"suggestion_"+index}
                                                                onClick={()=>{
                                                                    const formData = {...addCollaboratorData}
                                                                    formData['email'] = e
                                                                    setAddCollaboratorData(formData)
                                                                    setSuggestions([])
                                                                }}
                                                            >{e}</p>
                                                        ))}
                                                    </div>}
                                                </div>

                                                <Select 
                                                    option={["Select Permission","Read only","Read and Write"]} 
                                                    defaultSelection={addCollaboratorData.permission}
                                                    onSelect={(val)=>{
                                                        const formData = {...addCollaboratorData}
                                                        formData['permission'] = val
                                                        setAddCollaboratorData(formData)
                                                    }}
                                                />

                                                <Button  onClick={sendInvite} block border_radius label={"Send Invite"} background_color={"#0A80ED"} color={"#ffffff"}/>
                                            </div>

                                            {pendingInvites.map((collaborator:CollaboratorType,index)=>(
                                               <Collaborator 
                                                    actionFunc={()=>{cancelInvite(collaborator)}}
                                                    key={"pending_invite_"+index} 
                                                    name={collaborator.name} 
                                                    permission={collaborator.permission.replaceAll("_"," ")} 
                                                    action={"remove"}
                                                    id={collaborator.id}
                                                    collaborators={pendingInvites}
                                                    updateCollaborators={setPendingInvites}
                                                /> 
                                            ))}
                                        </div>
                                        <div>
                                            <p>Active Collaborators</p>
                                            <div className={styles.collaborator_div}>
                                                {activeCollaborators.map(e=>(
                                                    <Collaborator 
                                                        key={"active_c_"+e.id}
                                                        name={e.name} 
                                                        permission={e.permission.replaceAll("_"," ")} 
                                                        action={"update"}
                                                        id={e.id}
                                                        collaborators={activeCollaborators}
                                                        updateCollaborators={setActiveCollaborators}
                                                    />
                                                ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.btn_row}>
                                    {editing?<Button 
                                        border_radius 
                                        label={"Delete repo"} 
                                        background_color={"#2b303670"} 
                                        color={"#943030ff"}
                                        onClick={()=>{router.back()}}
                                    />:<div></div>}
                                    <div className={`${styles.btn_container} ${styles.btn_end}` }>
            
                                        <Button 
                                            border_radius 
                                            label={"Cancel"} 
                                            background_color={"#2B3036"} 
                                            color={"#ffffff"}
                                            onClick={()=>{router.back()}}
                                        />
                                        <Button loading={formLoading} onClick={createRepo} border_radius label={editing?"Update Repository":"Create Repository"} background_color={"#0A80ED"} color={"#ffffff"}/>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageRepoPage;


// ** Repo task **
// repo filtering       -- done
// delete collaborator  -- done
// delete repo          -- pending
// update repo          -- done
// delete pop up        -- pending
// repo scaling         -- pending

// NOTE : public repo creation only