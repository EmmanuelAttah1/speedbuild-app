import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { Button } from "../button/button"
import styles from "./navbar.module.css"
import Link from "next/link"

export const NavBar=(props:{
    hideItems?:boolean,
    router?: AppRouterInstance
})=>{
    return(
        <div className={styles.navBar}>
            <div className={styles.brand_container}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_2_244)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.02663 8L1.33333 6.41597L3.31846 2.91739L6.01333 4.4987L6.01487 1.33333H9.98513L9.98667 4.4987L12.6815 2.91739L14.6667 6.41597L11.9733 8L14.6667 9.58403L12.6815 13.0826L9.98667 11.5013L9.98513 14.6667H6.01487L6.01333 11.5013L3.31846 13.0826L1.33333 9.58403L4.02663 8Z" fill="white"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_2_244">
                    <rect width="16" height="16" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
                <p className="brand-name">SpeedBuild</p>
            </div>
            {props.hideItems? null :<div className={styles.nav_items}>
                {/* <Link href="/doc" className={styles.nav_item}>Docs</Link> */}
                <div className={styles.nav_item}>Community</div>
                <Link href="/doc#help" className={styles.nav_item}>Help</Link>
                <Button
                    background_color="#2B3036"
                    color="#ffffff"
                    label="Sign In"
                    border_radius={true}
                    onClick={()=>{
                        props.router?.push("/login")
                    }}
                />
            </div>}
        </div>
    )
}