"use client"
import Link from "next/link";
import { Button } from "../components/button/button";
import { CenterPageSkeleton } from "../components/center_skeleton/center_skeleton"
import { Input } from "../components/input/input";
import { NavBar } from "../components/navbar/navbar";

import styles from "./login.module.css"
import { useState } from "react";
import { manageServerCall } from "@/api/api";

import { useSearchParams, useRouter } from "next/navigation";

const Login =()=>{
    const [formData, setFormData] = useState<Record<string,string>>({
        username:"",
        password:""
    })

    const [hasError, setHasError] = useState<boolean>(false)

    const router = useRouter()

    const [loading,setLoading] = useState<boolean>(false)

    const updateFormField=(key: string, value:string)=>{
        const data = {...formData}
        data[key] = value
        setFormData(data)
    }

    const params = useSearchParams()
    const wsToken = params.get('token')

    const submiForm=()=>{
        console.log(formData);
        const data = formData

        if(wsToken){
            console.log(wsToken);
            data['token'] = wsToken
        }

        setLoading(true)
        manageServerCall("post","auth/login/",{},data)
        .then(res=>{
            console.log(res);
            setLoading(false)
            setHasError(false)
            router.push('/login-successful')
        })
        .catch(err=>{
            console.log(err);
            setLoading(false)
            setHasError(true)
        })
    }

    return (
        <CenterPageSkeleton>
            <NavBar hideItems={true}/>
            <div className="MainContainer">
                <h1>Welcome Back</h1>
                {hasError&&<p className={styles.error_text}>* Invalid Email or Password</p>}
                <form className={styles.form_container} onSubmit={(e)=>{
                    e.preventDefault()
                    submiForm()
                }}>
                    <div className={styles.form_container_inner}>
                        <Input label="Email" name="username" updateValue={updateFormField} placeholder="Enter your email address"/>
                        <Input label="Password" name="password" updateValue={updateFormField} placeholder="Enter your password" secret={true}/>
                    </div>
                    <Button
                        background_color="#0A80ED"
                        color="#ffffff"
                        label="Login"
                        border_radius={true}
                        block = {true}
                        loading={loading}
                    />
                </form>
                <Link href="" className={styles.forgot_password}>Forgot Password?</Link>
                <Link href={wsToken?`/register?token=${wsToken}`:'/register'} className={styles.forgot_password}>{'Dont have an account? <a href="/register">Sign up</a>'}</Link>
            </div>
        </CenterPageSkeleton>
    );
}

export default Login