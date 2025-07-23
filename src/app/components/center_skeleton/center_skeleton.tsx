import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"

export const CenterPageSkeleton=(props: { children: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined })=>{
    return(
        <div style={{
            width:"100%",
            height:"100vh",
            display:"flex",
            justifyContent:"center", 
            alignItems:"center",
            flexDirection:"column",
            position:"relative",
            gap:"20px",
            }}>
            {props.children}
        </div>
    )
}