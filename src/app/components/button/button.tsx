import { Spinner } from "../spinner/spinner"
import styles from "./button.module.css"
import { MouseEventHandler } from "react"

export const Button=(props:{
    label:string,
    background_color:string,
    color:string,
    border_radius?:boolean
    block?:boolean,
    onClick?:MouseEventHandler<HTMLButtonElement>,
    loading?:boolean
})=>{
    const size = props.block? "100%" : "fit-content"

    const style = {
        backgroundColor:props.background_color,
        color:props.color,
        borderRadius: props.border_radius? "8px" : "0px",
        width:size,
    }
    return(
        <button style={style} className={styles.button} onClick={(e)=>{
            if(props.onClick){
                props.onClick(e)
            }
        }}>
            {props.loading===true? <Spinner color="#000000"/> : props.label}
        </button>
    )
}