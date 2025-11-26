"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { NavBar } from "../components/navbar/navbar";
import styles from "./style.module.css"
import Image from "next/image";
import postImage from "../components/images/post_1.png"
import { useEffect, useState, useRef } from "react";
import { manageServerCall } from "@/api/api";
import { object } from "framer-motion/client";


const SearchBar=(props:{placeholder:string, search:(key:string,val:string)=>void})=>{
    const [query,setQuery] = useState<string|null>(null)
    
    return (
        <div className={styles.search_container}>
            <div className={styles.search_icon} onClick={()=>{
                if(query !== null){
                    props.search("name",query)
                }
            }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_135_184)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.5306 20.4694L16.8366 15.7762C19.6629 12.383 19.3204 7.36693 16.0591 4.38935C12.7978 1.41176 7.77134 1.526 4.64867 4.64867C1.526 7.77134 1.41176 12.7978 4.38935 16.0591C7.36693 19.3204 12.383 19.6629 15.7762 16.8366L20.4694 21.5306C20.7624 21.8237 21.2376 21.8237 21.5306 21.5306C21.8237 21.2376 21.8237 20.7624 21.5306 20.4694ZM3.75 10.5C3.75 6.77208 6.77208 3.75 10.5 3.75C14.2279 3.75 17.25 6.77208 17.25 10.5C17.25 14.2279 14.2279 17.25 10.5 17.25C6.77379 17.2459 3.75413 14.2262 3.75 10.5Z" fill="#9CABBA"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_135_184">
                            <rect width="24" height="24" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <input type="text" placeholder={props.placeholder} onInput={(e)=>{setQuery((e.target as HTMLInputElement).value)}}/>
        </div>
    );
}

const Tag=(props:{name:string})=>{
    return (
        <div className={styles.tag}>{props.name}</div>
    )
}

const FeatureCard=(props:{name:string,description:string,tags:string[],onClick:()=>void})=>{
    return (
        <div className={styles.feature_card} onClick={()=>{props.onClick()}}>
            <p className={styles.feature_name}>{props.name}</p>
            <p className={styles.feature_description}>{props.description}</p>
            <div className={styles.tags_container}>
                {
                    props.tags.map((e,index)=>(
                        <Tag key={index+"_"+e+"_"+props.name} name={e} />
                    ))
                }
            </div>
        </div>
    )
}


const ChatBotMessage = (props: {msg: React.ReactNode, placeholder:string, btnText:string}) => {
    return (
        <div className={styles.chat_bot_container}>
            <div className={styles.chat_bot}>
                <textarea className={styles.textarea} placeholder={props.placeholder}/>
                <button className={styles.chat_bot_btn}>{props.btnText}</button>
            </div>
            {props.msg}
        </div>
    )
}


const SemanticSearch=()=>{
    return(
        <>
            <div className={styles.feature_head_container}>
                <div className={styles.feature_detail_head}>
                    <p className={styles.feature_name}>Semantic Search </p>
                </div>
            </div>

            <p className={styles.feature_description}>Find Features by describing their functionality.</p>

            <div className={styles.feature_right_main}>
                <p className={styles.text}>Try searching for <b>django drf user authentication with jwt</b> or <b>express mongodb database connection</b> to find relevant features</p>
            </div>

            <ChatBotMessage msg = {<div className={styles.chat_bot_msg}>
                <p>5 / 10 searches remaining</p>
                <p>|</p>
                <p className={styles.chat_bot_link}>Upgrade for unlimited search</p>
            </div>} placeholder="Describe what you want" btnText="Search"/>
        </>
    )
}


type FeatureType={
    name: string
    framework: string,
    id: number,
    repo:string,
    description:string,
    versions: {id:number,version:string}[]
}

type FeatureServerResponse = {
    data:FeatureType[]
}


const ProfilePage=()=>{
    const router = useRouter()
    const [semanticSearchOpened, setSemanticSearchOpened] = useState<boolean>(true)
    const [featureTemplates, setFeatureTemplates] = useState<FeatureType[]>([])
    const [userqueryParams, setQueryParams] = useState<Record<string,string>>({})
    const [selectedFeature, setSelectedFeature] = useState<FeatureType>()

    const params = useSearchParams()

    const getTemplates=(params={})=>{
        const searchParams = Object.keys(params).length > 0 ? params : userqueryParams

        manageServerCall("get","template",searchParams,{},true)
        .then(res=>{
            console.log(res);
            const data = res as FeatureServerResponse
            setFeatureTemplates(data.data)
        })
    }

    const filterTemplate=(key:string,val:string)=>{
        const data = {...userqueryParams}
        data[key] = val
        setQueryParams(data)
        // sync URL with query params
        const params = new URLSearchParams();
        Object.entries(data).forEach(([k, v]) => {
            if (v !== undefined && v !== null && v !== "") params.set(k, v as string);
        });
        const url = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
        router.push(url);
        setSemanticSearchOpened(true)
        getTemplates(data)    
    }

    const openFeature=(feature:FeatureType)=>{
        console.log("opening ",feature);
        
        setSelectedFeature(feature)
        setSemanticSearchOpened(false)
    }

    useEffect(()=>{
        // Simple key -> value object (if a key appears multiple times, last value wins)
        const queryParams: Record<string, string> = params
            ? Object.fromEntries(Array.from(params.entries()))
            : {};
        console.log(queryParams);

        // If you need repeated keys as arrays instead:
        const queryParamsWithArrays: Record<string, string | string[]> = params
            ? Array.from(params.keys()).reduce((acc, key) => {
                    const values = params.getAll(key);
                    acc[key] = values.length > 1 ? values : values[0];
                    return acc;
                }, {} as Record<string, string | string[]>)
            : {};

        setQueryParams(queryParamsWithArrays as Record<string,string>)
        getTemplates(queryParamsWithArrays)
    },[])


const FeatureDetail=(props:{openSearch:(opened:boolean)=>void})=>{
    return(
        <>
            <div className={styles.feature_head_container}>
                <div className={styles.feature_detail_head}>
                    <div className={styles.search_icon} onClick={()=>{props.openSearch(true)}}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 18L8 12L14 6L15.4 7.4L10.8 12L15.4 16.6L14 18Z" fill="#FFFFFF"/>
                        </svg>
                    </div>
                    <p className={styles.feature_name}>{selectedFeature?.repo}/{selectedFeature?.name} </p>
                </div>

                <div className={styles.feature_versions}>
                    <div className={styles.tag}>Lts</div>
                </div>
            </div>

            <div className={styles.feature_right_main}>
                <div>
                    <p className={styles.feature_name}><b>Usage</b></p>
                    <p className={styles.feature_description}>
                        speedbuild use {selectedFeature?.repo}/{selectedFeature?.name}  --{selectedFeature?.framework}
                    </p>
                </div>

                <div>
                    <p className={styles.feature_name}><b>Description</b></p>
                    <p className={styles.feature_description}>
                        {selectedFeature?.description}
                    </p>
                </div>

                {/* <div>
                    <p className={styles.feature_name}><b>Code</b></p>
                    <p className={styles.feature_description}>
                        Feature code goes here
                    </p>
                </div> */}
            </div>

            <ChatBotMessage msg={<div className={styles.chat_bot_msg}>
                <p>20 / 100 free credit remaining</p>
                <p>|</p>
                <p className={styles.chat_bot_link}>Upgrade for unlimited queries</p>
            </div>} placeholder="Ask about feature template" btnText="Send"/>
        </>
        )   
    }

    return (
        <>
            <NavBar router={router}/>
            <div className="MainContainer">
                <div className="MainBody_wide">
                    <div className={styles.feature_library} style={{gridTemplateColumns:semanticSearchOpened?"4fr 1.5fr":"4fr 3fr"}}>
                        
                        <div className={styles.feature_left}>
                            <div className={styles.library_header}>
                                <h1>Feature Library</h1>
                                <SearchBar placeholder="Find Template" search={filterTemplate} />
                            </div>
                            <p className={styles.text}>Explore and integrate SpeedBuild features into your project.</p>

                            <div className={styles.filters}>
                                <div className={styles.filter} onClick={()=>{filterTemplate("tag","All")}}>All</div>
                                <div className={styles.filter} onClick={()=>{filterTemplate("tag","Public")}}>Public</div>
                                <div className={styles.filter} onClick={()=>{filterTemplate("tag","Private")}}>Private to me</div>
                                <div className={styles.filter} onClick={()=>{filterTemplate("tag","django")}}>Django</div>
                                <div className={styles.filter} onClick={()=>{filterTemplate("tag","express")}}>Express</div>
                            </div>

                            <div className={styles.feature_body}>
                                {featureTemplates.map((e)=>(<FeatureCard 
                                    key={"template_"+e.id}
                                    name={e.name}
                                    description={e.description.slice(0,20)}//"Secure user login with email/password" 
                                    tags={["Private","Security","Authentication"]}
                                    onClick={()=>{openFeature(e)}}
                                />))}
                            </div>
                        </div>
                        <div className={styles.feature_right}>
                            {
                                semanticSearchOpened? <SemanticSearch/> : <FeatureDetail openSearch={setSemanticSearchOpened}/> 
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;