"use client"
import { useEffect, useState } from "react"
import styles from "../input/input.module.css"

export const Select=(props:{
    label?:string,
    option:string[],
    error?:string,
    placeholder?:string,
    defaultSelection?:string,
    onSelect?:(selected:string)=>void
})=>{
    const [expanded,setExpanded] = useState(false)
    const [selected, setSelected] = useState(props.placeholder)

    const chooseOption=(value:string)=>{
        setSelected(value)
        setExpanded(false)
        if(props.onSelect){
            props.onSelect(value)
        }
    }

    useEffect(()=>{
        if(props.defaultSelection){setSelected(props.defaultSelection)}
    },[props.defaultSelection])

    const inputClass = props.error? `${styles.select_input} ${styles.input_error}` : styles.select_input

    return (  
        <div>
            {props.label&&<p className={styles.input_label}>{props.label}</p>}
            {props.error&&<p className={styles.error_text}>*{props.error}</p>}
            <div className={inputClass}>
                <div className={styles.selectContainer} onClick={()=>{setExpanded(!expanded)}}>
                    <div className={styles.selectLabel}>{selected}</div>
                    <div className={styles.selectIcon} >
                        <svg width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.81148 11.9603C8.93218 12.0829 9 12.2493 9 12.4228C9 12.5964 8.93218 12.7628 8.81148 12.8854L4.9547 16.8082C4.83414 16.931 4.67053 17 4.49993 17C4.32932 17 4.16572 16.931 4.04515 16.8082L0.188375 12.8854C-0.0627917 12.6299 -0.0627917 12.2157 0.188375 11.9603C0.439542 11.7048 0.846764 11.7048 1.09793 11.9603L4.49993 15.4214L7.90192 11.9603C8.02249 11.8375 8.1861 11.7685 8.3567 11.7685C8.5273 11.7685 8.69091 11.8375 8.81148 11.9603ZM1.09793 5.03973L4.49993 1.57864L7.90192 5.03973C8.15309 5.2952 8.56031 5.2952 8.81148 5.03973C9.06264 4.78426 9.06264 4.37006 8.81148 4.11459L4.9547 0.191753C4.83414 0.0689829 4.67053 0 4.49993 0C4.32932 0 4.16572 0.0689829 4.04515 0.191753L0.188375 4.11459C-0.0627917 4.37006 -0.0627917 4.78426 0.188375 5.03973C0.439542 5.2952 0.846764 5.2952 1.09793 5.03973Z" fill="#9CABBA"/>
                        </svg>
                    </div>
                </div>
                {expanded&&<div className={styles.selectChildren}>
                    {props.option.filter(e=>{return e !== selected}).map((e,index)=>(
                        <div key={props.label+"_"+index} className={styles.selectChild} onClick={()=>{chooseOption(e)}}>{e}</div>
                    ))}
                </div>}
            </div>
        </div>
    )
}