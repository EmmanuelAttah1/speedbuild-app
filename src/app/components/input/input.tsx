import { FormEvent } from "react"
import styles from "./input.module.css"
import { RegistrationType } from "@/utils/types"

export const Input=(props:{
    label:string,
    value?:string,
    placeholder?:string,
    secret?:boolean,
    name?:string,
    error?:string,
    textarea?:boolean
    updateValue?:(key:keyof RegistrationType,value:string,extra:boolean)=>void
})=>{
    const inputClass = props.error? `${styles.custom_input} ${styles.input_error}` : styles.custom_input
    return(
        <div>
            <p className={styles.input_label}>{props.label}</p>
            {props.error&&<p className={styles.error_text}>*{props.error}</p>}
            {
                props.textarea?
                <textarea 
                    className={styles.textarea} 
                    value={props.value}
                    placeholder={props.placeholder?props.placeholder:""}
                    onInput={(e:FormEvent<HTMLTextAreaElement>)=>{
                        if(props.name && props.updateValue){
                            props.updateValue(props.name as keyof RegistrationType, (e.target as HTMLInputElement).value, true)
                        }
                    }}
                />
                :
                <input 
                    required 
                    type={props.secret?"password":"text"} 
                    className={inputClass} 
                    value={props.value}
                    placeholder={props.placeholder?props.placeholder:""}
                    onInput={(e:FormEvent<HTMLInputElement>)=>{
                        if(props.name && props.updateValue){
                            props.updateValue(props.name as keyof RegistrationType, (e.target as HTMLInputElement).value, true)
                        }
                    }}
                />
            }
        </div>
    )
}