import { FormEvent } from "react";
import styles from "../input/input.module.css"

export const CheckBoxInput=(props:{
    label:string,
    checked?:boolean,
    onChecked?:(label:string,checked:boolean)=>void
})=>{
    return(
        <div className={styles.checkbox_container}>
            <input type="checkbox" className={styles.checkbox} checked={props.checked} onChange={(e:FormEvent<HTMLInputElement>)=>{
                if(props.onChecked){
                    props.onChecked(props.label,e.currentTarget.checked)
                }
            }}/>
            <p style={{margin:"0px", padding:"5px", fontSize:"14px"}}>{props.label}</p>
        </div>
    )
}