"use client"
import { Button } from "../components/button/button";
import { CenterPageSkeleton } from "../components/center_skeleton/center_skeleton"
import { Input } from "../components/input/input";
import { NavBar } from "../components/navbar/navbar";

import styles from "./style.module.css"
import { Select } from "../components/select/select";
import { useState } from "react";
import { useRouter } from "next/navigation";


const OwnKeyChild=()=>{

    const [llmInfo,setllmInfo]=useState<{provider:string,value:string}>({
        provider:"<provider_name>",
        value:"<provider_api_key>"
    })

    const [defaultModel, setDefaultModel] = useState<string>("<model_name>")

    return (
        <div>
            <div className={styles.customRow}>
                <div className={styles.llm_container}>
                    <Select label="Select LLM Provider" placeholder="Select provider" option={[
                        "OpenAI",
                        "Anthropic",
                        "Google",
                    ]} onSelect={(val)=>{
                        const data = {...llmInfo}
                        data.provider = val.toLowerCase()
                        setllmInfo(data)
                    }}/>
                    <Input label="Enter LLM API Key" placeholder="*************" name="llm-key" updateValue={(key:string,value:string)=>{
                        console.log(key);
                        const data = {...llmInfo}
                        data.value = value
                        setllmInfo(data)
                    }}/>
                </div>
            </div>
            <div className={styles.intructions}>
                <p>Instructions for setting up API keys: </p>
                <ol>
                    <li>1. Open up your terminal.</li>
                    <li>2. Run <span className={styles.sb_command} onClick={async ()=>{
                        await navigator.clipboard.writeText("speedbuild llm provider " + llmInfo.provider+" "+llmInfo.value);
                        alert("Copied to clipboard!");
                    }}>speedbuild llm provider {llmInfo.provider} {llmInfo.value}</span></li>
                </ol>
                <br/>

                
                <p>By default we use your first llm provider, to change run:</p>
                <ul>
                    <li>
                        <div className={styles.selectModel}>
                            <Select placeholder="Select LLM" option={[
                                "gpt-4o-2024-08-06",
                                "Claude sonnet 3.7",
                                "Gemini 2.5",
                            ]} onSelect={(val)=>{
                                setDefaultModel(val)
                            }}/>
                        </div>
                    </li>
                    <li>1. Run <span className={styles.sb_command} onClick={async ()=>{
                        await navigator.clipboard.writeText("speedbuild llm model "+defaultModel);
                        alert("Copied to clipboard!");
                    }}>{"speedbuild llm model "+defaultModel}</span></li>
                </ul>
            </div>
        </div>
    )
}
const LLMOptions = [
    {
        label:"Use Your Own API Keys",
        description:"Provide your own API keys from services like OpenAI and Cohere for full control and flexibility. Follow the instructions below to set up your keys.",
        id:1,
        children:<OwnKeyChild/>
    },
    {
        label:"Use SpeedBuild's Keys ( Coming Soon )",
        description:"Use SpeedBuild's API keys for a limited number of requests. This option is suitable for testing and small projects. Usage restrictions apply.",
        id:2,
        children:null
    },
    {
        label:"Upgrade to Premium  ( Coming Soon )",
        description:"Upgrade to a premium plan for unlimited access to SpeedBuild's API keys and additional features. Enjoy unrestricted usage and priority support.",
        id:3,children:null
    }
]

const LLMConfiguration =()=>{

    const [selectedLLMOPtion, updateSelectedLLMOPtion] = useState<number>(1)

    const Unchecked=()=>{
        return <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1.5" width="18" height="18" rx="9" stroke="#40474F" stroke-width="2"/>
            </svg>
    }

    const Checked = ()=>{
        return (
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_3_98)">
                <path d="M6.25 10.5C6.25 12.5711 7.92893 14.25 10 14.25C12.0711 14.25 13.75 12.5711 13.75 10.5C13.75 8.42893 12.0711 6.75 10 6.75C7.92893 6.75 6.25 8.42893 6.25 10.5Z" fill="white"/>
                </g>
                <rect x="1" y="1.5" width="18" height="18" rx="9" stroke="white" stroke-width="2"/>
                <defs>
                <clipPath id="clip0_3_98">
                <rect y="0.5" width="20" height="20" rx="10" fill="white"/>
                </clipPath>
                </defs>
            </svg>
        )
    }

    const LLMSelection = (props: {
        label: string,
        description: string,
        active: boolean,
        onClick: () => void,
        children?: React.ReactNode
    }) => {
        return (
            <>
                <div className={styles.radioContainer}>
                    <div className={styles.radioLeft} onClick={props.onClick}>
                        {props.active ? <Checked /> : <Unchecked />}
                    </div>
                    <div className={styles.radioRight}>
                        <p className={styles.radioHeading}>{props.label}</p>
                        <p className={styles.radioBody}>{props.description}</p>
                    </div>
                </div>
                {props.children && <div>
                    {props.children}
                </div>}
            </>
        )
    }

    const router = useRouter()

    return (
        <CenterPageSkeleton>
            <NavBar />
            <div className="MainContainer" style={{
                position:"absolute",
                top:"0px", 
                paddingTop:"100px",
                paddingBottom:"100px", 
            }}>

                <h1 className={styles.center}>LLM Configuration</h1>
                <p className={styles.center}>Customize how SpeedBuild uses LLMs to extract code. Choose an option below to get started.</p>

                <div className={styles.llmoptions}>
                    {LLMOptions.map((option)=>(
                        <LLMSelection 
                            key = {"llm_option_"+option.id}
                            label={option.label} 
                            description={option.description}
                            active={selectedLLMOPtion === option.id}
                            onClick={()=>{updateSelectedLLMOPtion(option.id)}}
                        >{option.children}</LLMSelection>
                    ))}
                </div>

                <div style={{display:"flex",justifyContent:"center", width:"100%"}}>
                    <Button label={"Mark as Completed"} background_color={"#0A80ED"} color={"#ffffff"} border_radius={true} onClick={()=>{
                        router.push("/login-successful")
                    }}/>
                </div>
               
            </div>
        </CenterPageSkeleton>
    );
}

export default LLMConfiguration