"use client"
import { useRouter } from "next/navigation";
import { NavBar } from "../components/navbar/navbar";
import { Button } from "../components/button/button";

import styles from "../library/style.module.css"
import { useEffect, useState } from "react";
import { manageServerCall } from "@/api/api";
import Link from "next/link";


const SearchBar=(props:{placeholder:string,searchFun:(query:string)=>void})=>{
    return (
        <div className={styles.search_container}>
            <div className={styles.search_icon}>
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
            <input 
            type="text" 
            placeholder={props.placeholder}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    props.searchFun(e.currentTarget.value);
                }
            }}
            />
        </div>
    );
}


type RepoType={
    created_by:string,
    description:string,
    id:number,
    name:string,
    template:number
}

type RepoResponse={
    repos : RepoType[]
}

const ProfilePage=()=>{
    const router = useRouter()
    const [repos, setRepos] = useState<RepoType[]>()

    const getRepos=(name:string="")=>{
        const queryparams = name.length>0? {name:name} : undefined
        manageServerCall("get","repo",queryparams,{},true)
        .then(res=>{
            console.log(res);
            const data = res as RepoResponse
            setRepos(data.repos)
        })
    }

    useEffect(()=>{
        getRepos()
    },[])

    return (
        <>
            <NavBar router={router}/>
            <div className="MainContainer">
                <div className="MainBody_wide center">
                    <div className="MainBody no-padding-top">
                        <div className={styles.feature_left}>
                            <div className={styles.library_header}>
                                <h1>Repositories</h1>
                                <Button border_radius={true} label="Create Repository" onClick={() => { router.push("/create-repo")} } background_color={"#2b3036"} color={"#ffffff"}/>
                            </div>
                            <SearchBar placeholder="Search repositories" searchFun={getRepos}/>
                            <br/>
                            <div className="flex overflow-hidden rounded-lg border border-[#314d68] bg-[#101a23]">
                                <table className="flex-1 table">
                                    <thead>
                                        <tr className="bg-[#182734]">
                                        <th className="table-6ce3975c-b2c9-4cf5-b851-ddd2d1731e43-column-120 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">Name</th>
                                        <th className="table-6ce3975c-b2c9-4cf5-b851-ddd2d1731e43-column-240 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">Description</th>
                                        <th className="table-6ce3975c-b2c9-4cf5-b851-ddd2d1731e43-column-480 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">Owner</th>
                                        <th className="table-6ce3975c-b2c9-4cf5-b851-ddd2d1731e43-column-720 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">Features</th>
                                        <th className="table-6ce3975c-b2c9-4cf5-b851-ddd2d1731e43-column-840 px-4 py-3 text-left text-white w-60 text-[#90aecb] text-sm font-medium leading-normal">
                                            Actions
                                        </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {repos?.map((e)=>(
                                           <tr className="border-t border-t-[#314d68]" key={"repo_"+e.id}>
                                                <td className="table-6ce3975c-b2c9-4cf5-b851-ddd2d1731e43-column-120 h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">
                                                    <Link href={"/library?repo="+e.id}>{e.name}</Link>
                                                </td>
                                                <td className="table-6ce3975c-b2c9-4cf5-b851-ddd2d1731e43-column-240 h-[72px] px-4 py-2 w-[400px] text-[#90aecb] text-sm font-normal leading-normal">
                                                   {e.description}
                                                </td>
                                                <td className="table-6ce3975c-b2c9-4cf5-b851-ddd2d1731e43-column-480 h-[72px] px-4 py-2 w-[400px] text-[#90aecb] text-sm font-normal leading-normal">
                                                    {e.created_by}
                                                </td>
                                                <td className="table-6ce3975c-b2c9-4cf5-b851-ddd2d1731e43-column-720 h-[72px] px-4 py-2 w-[400px] text-[#90aecb] text-sm font-normal leading-normal">{e.template}</td>
                                                <td className="table-6ce3975c-b2c9-4cf5-b851-ddd2d1731e43-column-840 h-[72px] px-4 py-2 w-60 text-[#90aecb] text-sm font-bold leading-normal tracking-[0.015em]">
                                                    <Link href={"/create-repo?id="+e.id}>Manage</Link>
                                                </td>
                                            </tr> 
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;