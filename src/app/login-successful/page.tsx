"use client"
import { Button } from "../components/button/button";
import { CenterPageSkeleton } from "../components/center_skeleton/center_skeleton"
import { NavBar } from "../components/navbar/navbar";

import styles from "../login/login.module.css"

const LoginSuccessful =()=>{

    return (
        <CenterPageSkeleton>
            <NavBar hideItems={true}/>
            <h1>Authentication Successful</h1>
            <p className={styles.subtitle}>Please return back to your terminal</p>
            Or
            <Button
                background_color="#40474F"
                color="#ffffff"
                label="View Get Started Guide"
                border_radius={true}
            />
        </CenterPageSkeleton>
    );
}

export default LoginSuccessful