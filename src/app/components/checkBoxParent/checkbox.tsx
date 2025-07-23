import { CheckBoxInput } from "../checkbox/checkbox"
import { Input } from "../input/input"
import styles from "../../login/login.module.css"
import { useState,useEffect } from "react"

export const CheckBoxParent=(props:{
    label:string,
    options:string[],
    hasOtherFieldLabel?:string,
    error?:string,
    defaultValue?:string[],
    updateInput?:(vals:string[])=>void
})=>{
    const [showOtherInputField, setShowOtherInputField] = useState(false)
    const [checkBoxValue,setCheckBoxValue] = useState<string[]>([])

    const [otherValues, setOtherValues] = useState<string>("")

    useEffect(()=>{
        if(props.defaultValue){
            console.log(props.defaultValue, " defaulr vale");
            
            const data = props.defaultValue
            // const valueEnteredForOthers = data.find(e=>(!props.options.includes(e)))
            // if(valueEnteredForOthers){
            //     setOtherValues(valueEnteredForOthers)
            //     setShowOtherInputField(true)
            // }
            setCheckBoxValue(data)
        }
    },[props.defaultValue])

    const updateCheckBoxValues=(value:string)=>{
        let data = [...checkBoxValue]
        let addOthers = showOtherInputField

        if(value !== "Others"){
            if(data.includes(value)){
                data = data.filter(e=>{return e !== value})
            }else{
                data.push(value)
            }

            setCheckBoxValue(data)
            // console.log(data);
            // if (showOtherInputField && otherValues.length>0){
            //     console.log(otherValues)
            // }
            
        }else{
            addOthers = !addOthers
            setShowOtherInputField(addOthers)
        }

        if(props.updateInput){
            console.log(otherValues, " fgfsdhfhf");
            
            props.updateInput([...data,otherValues])
        }
        
    }

    return(
        <div className={styles.form_container_inner}>
            {props.error&&<p className={styles.error_text}>*{props.error}</p>}
            <h3>{props.label}</h3>
            {props.options.map((e,index)=>(
                <CheckBoxInput label={e} checked={props.defaultValue?.includes(e)} onChecked={updateCheckBoxValues} key={props.label.replaceAll(" ","_"+index)}/>
            ))}
            {props.hasOtherFieldLabel&&<CheckBoxInput onChecked={updateCheckBoxValues} checked={showOtherInputField} label={"Others"}/>}
            {(showOtherInputField && props.hasOtherFieldLabel)&&<Input name="others" updateValue={(key,val:string)=>{
                setOtherValues(val)
                console.log(val);
                updateCheckBoxValues("Others")
            }}value={otherValues} label={props.hasOtherFieldLabel} placeholder={props.hasOtherFieldLabel}/>}
        </div>
    )
}