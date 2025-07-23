"use client"
import Link from "next/link";
import { Button } from "../components/button/button";
import { CenterPageSkeleton } from "../components/center_skeleton/center_skeleton"
import { Input } from "../components/input/input";
import { NavBar } from "../components/navbar/navbar";

import styles from "../login/login.module.css"
import { Select } from "../components/select/select";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckBoxParent } from "../components/checkBoxParent/checkbox";
import { RegistrationType, RegistrationKeys } from "@/utils/types";
import { manageServerCall } from "@/api/api";

import { useSearchParams } from "next/navigation";

const RegisterPage =()=>{
    const maxTab = 3
    const [tab, setTab] = useState<number>(1)

    const [formLoading,setFormLoading] = useState(false)

    const params = useSearchParams()

    const wsToken = params.get('token')

    const [onBoardingData, setOnboardingData] = useState<RegistrationType>({
        full_name:{
            value:"",
            error:""
        },
        email:{
            value:"",
            error:""
        },
        password:{
            value:"",
            error:""
        },
        role:{
            value:"",
            error:""
        },
        speedBuildGoals:{
            value:"",
            error:""
        },
        teamSize:{
            value:"",
            error:""
        },
        frameworks:{
            value:[],
            error:""
        }
    })

    const [showOtherRole, toggleOtherRole] = useState<boolean>(false)
    const [showOtherGoal, toggleOtherGoal] = useState<boolean>(false)

    const stages = [
        ['full_name',"email","password"],
        ["role","speedBuildGoals","teamSize"],
        ["frameworks"]
    ]

    const validateForm=()=>{
        const current_stage = stages[tab-1]
        const data = {...onBoardingData}

        let hasError = false

        for (let i = 0; i < current_stage.length; i++) {
            const element = current_stage[i] as RegistrationKeys;
            console.log(element);
            
            if(data[element].value.length === 0){
                hasError = true
                data[element].error = "This field is required"
            }

            if(element === "email"){
                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const emailValue = Array.isArray(data[element].value) ? data[element].value.join(" ") : data[element].value;
                if (!emailRegex.test(emailValue)) {
                    hasError = true;
                    data[element].error = "Please enter a valid email address";
                }
            }else if(element === "full_name"){
                // Validate full name (at least two words)
                const fullNameValue = Array.isArray(data[element].value) ? data[element].value.join(" ") : data[element].value;
                if (fullNameValue.trim().split(" ").length < 2) {
                    hasError = true;
                    data[element].error = "Please enter your first and last name";
                }
            }
        }

        setOnboardingData(data)
        console.log(data);

        console.log(!hasError);
        
        
        return !hasError
    }

    const [regProgress, setRegProgress] = useState<string>(`${Math.round((100)/3)}%`)

    const router = useRouter()

    const caculateProgress=(value:number)=>{
        console.log(value);
        
        const progress = Math.round((value * 100)/3)
        const newProgress =  `${progress}%`
        setRegProgress(newProgress)
        console.log("progress ", newProgress);
        
        return newProgress
    }

    const prev=()=>{
        if(tab > 1){
            setTab(tab-1)
            caculateProgress(tab-1)
        }
    }

    const submitForm=()=>{
        const userKey = ["full_name","email","password"]
        
        const formData: { [key in RegistrationKeys | "first_name" | "last_name" | "token"]?: string } & { profile?: { [key in RegistrationKeys]?: string } } = {};

        // Initialize profile as an object
        formData.profile = {};

        (Object.keys(onBoardingData) as RegistrationKeys[]).forEach((i) => {
            if(i === "full_name"){
                const fullNameValue = Array.isArray(onBoardingData[i].value) ? onBoardingData[i].value.join(" ") : onBoardingData[i].value;
                const names = fullNameValue.split(" ");
                formData['first_name'] = names[0];
                formData['last_name'] = names.filter((e,index)=> index !== 0).join(" ");
            }else if (!userKey.includes(i)){
                formData.profile![i] = Array.isArray(onBoardingData[i].value)
                    ? onBoardingData[i].value.join(", ")
                    : onBoardingData[i].value;
            }else{
                formData[i] = Array.isArray(onBoardingData[i].value)
                    ? onBoardingData[i].value.join(", ")
                    : onBoardingData[i].value;
            }
        });

        console.log(formData);

        // get websocket token]
        if(wsToken){
            console.log(wsToken);
            formData['token'] = wsToken
        }

        setFormLoading(true)
        
        manageServerCall('post','auth/register/',{},formData,false,{},{},true)
        .then(()=>(
            router.push("/llm-configuration")
        ))
        .catch(err=>{
            setFormLoading(false)
            console.log(err);
            if(Object.keys(err).includes("email")){
                const data = {...onBoardingData}
                data['email']['error'] = err['email']
                setOnboardingData(data)
                setTab(1)
            }
        })
    }

    const next=()=>{
        // e.preventDefault()
        const formValid = validateForm()

        if(formValid){
            if(tab < maxTab){
                setTab(tab+1)
                caculateProgress(tab+1)
            }else{
                // trigger registration here
                submitForm()
            }
        }
    }

    const register=()=>{
        if(tab===1){next()}
    }

    const updateFrameworks=(values:string[])=>{
        const data = {...onBoardingData}
        const selected = values
        data.frameworks.value = selected
        data.frameworks.error = ""

        setOnboardingData(data)
    }

    const updateInput=(key:keyof RegistrationType,value:string,extra:boolean=false)=>{
        const data = {...onBoardingData}

        console.log(key," ",value," from here");
        

        if(value === "Others"){
            if(key === "role"){
                if(!showOtherRole){
                    toggleOtherRole(true)
                    data[key].value = ""
                    data[key].error = ""
                }
            }else{
                if(!showOtherGoal){
                    toggleOtherGoal(true)
                    data[key].value = ""
                    data[key].error = ""
                }
            }
        }else{
            data[key].value = value
            data[key].error = ""

            if(!extra){
                if(showOtherRole && key === "role"){
                    toggleOtherRole(false)
                }

                else if(showOtherGoal && key === "speedBuildGoals"){
                    toggleOtherGoal(false)
                }
            }
        }

        setOnboardingData(data)
    }

    return (
        <CenterPageSkeleton>
            <NavBar hideItems={true}/>
            <div className="MainContainer" style={{
                position:"absolute",
                top:"0px", 
                paddingTop:"100px",
                paddingBottom:"100px" 
            }}>
                <div className={styles.progressBar + " flex flex-col gap-3 p-4"}>
                    <div className="flex gap-6 justify-between"><p className="text-white text-base font-medium leading-normal">Registration Progress</p></div>
                    <div className="rounded bg-[#3b4854]"><div className="h-2 rounded bg-white" style={{width: regProgress}}></div></div>
                    <p className="text-[#9cabba] text-sm font-normal leading-normal">Step {tab} of {maxTab}</p>
                </div>

                <form className={styles.form_container}>

                {
                tab === 1?
                    <>
                        <h1>User Information</h1>
                        <div className={styles.form_container_inner}>
                            <Input value={onBoardingData['full_name'].value as string} updateValue={updateInput} name="full_name" error={onBoardingData['full_name'].error} label="Full name" placeholder="Enter your first and last name"/>
                            <Input value={onBoardingData['email'].value as string} updateValue={updateInput} name="email" error={onBoardingData['email'].error} label="Email" placeholder="Enter your email address"/>
                            <Input value={onBoardingData['password'].value as string} updateValue={updateInput} name="password" error={onBoardingData['password'].error} label="Password" placeholder="Enter your password" secret={true}/>
                        </div>
                    </>
                :
                    tab === 2?
                        <>
                            <h1>User Role & Goals</h1>
                            <div className={styles.form_container_inner}>
                                <Select onSelect={(val)=>{
                                    updateInput('role',val)
                                    }} label="Primary Role" 
                                    placeholder="Select your role" 
                                    error={onBoardingData['role'].error} 
                                    defaultSelection={onBoardingData['role'].value as string}
                                    option={[
                                        "Backend",
                                        "Full Stack",
                                        "Devops",
                                        "Others"
                                    ]}
                                />
                                {showOtherRole&&<Input updateValue={updateInput} name="role" label="Other Role" placeholder="Other Role"/>}

                                <Select onSelect={(val)=>{
                                    updateInput('speedBuildGoals',val)
                                    }} placeholder={"What do you hope to get from speedbuild"} 
                                    error={onBoardingData['speedBuildGoals'].error} 
                                    defaultSelection={onBoardingData['speedBuildGoals'].value as string}
                                    label="What is your main goal with SpeedBuild" option={[
                                        "Reduce debugging time",
                                        "Accelerate feature development",
                                        "Enforce architectural standards",
                                        "Improve code quality and maintainability",
                                        "Others"
                                    ]}
                                />
                                {showOtherGoal&&<Input updateValue={updateInput} name="speedBuildGoals" label="Other Goals" placeholder="Other Goals"/>}
                                
                                <Select onSelect={(val)=>{
                                    updateInput('teamSize',val)
                                    }} placeholder={"How big is your team"} 
                                    error={onBoardingData['teamSize'].error} 
                                    defaultSelection={onBoardingData['teamSize'].value as string}
                                    label="Team Size" option={[ 
                                        "Solo developer",
                                        "Small team (2-10)",
                                        "Medium team (11-50)",
                                        "Large team (51+)"
                                    ]}
                                />
                            </div>
                        </>
                    :
                        <>
                            <h1>Frameworks</h1>
                            <CheckBoxParent 
                                label="What framework do you use?" 
                                options={["Django","Flask","FastAPI","JavaScript/TypeScript"]}
                                hasOtherFieldLabel="Other Frameworks/Languages"
                                error={onBoardingData['frameworks'].error}
                                defaultValue={onBoardingData['frameworks'].value as string[]}
                                updateInput={updateFrameworks}
                            />
                        </>
                }

                {
                    tab === 1 ?
                        <Button
                            background_color="#0A80ED"
                            color="#ffffff"
                            label={"Proceed"}
                            border_radius={true}
                            block = {true}
                            onClick={(e)=>{
                                e.preventDefault()
                                register()
                            }}
                        />
                    :
                        <div className={styles.registerBtn}>
                            <Button
                                background_color="#2B3036"
                                color="#ffffff"
                                label="Prev"
                                border_radius={true}
                                block = {true}
                                onClick={(e)=>{
                                    e.preventDefault()
                                    prev()
                                }}
                            />
                            <Button
                                background_color="#0A80ED"
                                color="#FFFFFF"
                                label={tab === maxTab? "Finish Registration" : "Proceed"}
                                border_radius={true}
                                block = {true}
                                loading={formLoading}
                                onClick={(e)=>{
                                    e.preventDefault()
                                    next()
                                }}
                            />
                        </div>
                }
                 <Link href={wsToken?`/login?token=${wsToken}`:'/login'}className={styles.forgot_password}>{'Already have an account? <a href="/login">Log in</a>'}</Link>
                </form>
               
            </div>
        </CenterPageSkeleton>
    );
}

const RegisterMainPage=()=>{
    return (
        <Suspense>
            <RegisterPage />
        </Suspense>
    );
}

export default RegisterMainPage;