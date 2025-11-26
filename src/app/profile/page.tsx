"use client"
import { useRouter } from "next/navigation";
import { NavBar } from "../components/navbar/navbar";
import styles from "./profile.module.css"
import Image from "next/image";
import postImage from "../components/images/post_1.png"
import Link from "next/link";

const ActionBtn=(props:{name:string,href:string})=>{
    return(
        <Link href={props.href} className={styles.action_btn}>{props.name}</Link>
    );
}

const Activity=(props:{name:string})=>{
    return (
        <div className={styles.activity_container}>
            <div className={styles.activity_left}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_131_86)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.25 6.75H12.3103L9.75 4.18969C9.46966 3.90711 9.08773 3.74873 8.68969 3.75H3.75C2.92157 3.75 2.25 4.42157 2.25 5.25V18.8081C2.25103 19.604 2.89598 20.249 3.69187 20.25H20.3334C21.1154 20.249 21.749 19.6154 21.75 18.8334V8.25C21.75 7.42157 21.0784 6.75 20.25 6.75V6.75ZM3.75 5.25H8.68969L10.1897 6.75H3.75V5.25ZM20.25 18.75H3.75V8.25H20.25V18.75Z" fill="white"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_131_86">
                    <rect width="24" height="24" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
            </div>
            <div className={styles.activity_right}>
                <div className={styles.activity_name}>My Project</div>
                <div className={styles.activity_time}>1 hour ago</div>
                <div className={styles.activity_subtitle}>Extracted a new feature</div>
            </div>
        </div>
    )
}

const ProfilePage=()=>{
    const router = useRouter()
    return (
        <>
            <NavBar router={router}/>
            <div className="MainContainer">
                <div className="MainBody">
                    <h1>Welcome Attah</h1>
                    <p>Your dashboard overview and quick actions</p>
                    <div className={styles.quick_action}>
                        <h2>Quick Actions</h2>
                        <div className={styles.action_btns}>
                            <ActionBtn href="/doc/Installation_Guide" name="Installation & Setup"/>
                            <ActionBtn href="/create-repo" name="Create Repository"/>
                            <ActionBtn href="/doc/Quick_Start_Guide?section=Extraction" name="Extract Feature"/>
                            <ActionBtn href="/doc/Quick_Start_Guide?section=Deploy" name="Deploy Feature"/>
                            <ActionBtn href="/library" name="Find Feature"/>
                        </div>
                    </div>
                    <div className={styles.tabGrid}>
                        <div className={styles.tab}>
                            <h2>Recent Activity</h2>
                            <div className={styles.tab_body}>
                                <Activity name="hello"/>
                                <Activity name="hello"/>
                                <div className={styles.tab_btn}>View All Activity</div>
                            </div>
                        </div>
                        <div className={styles.tab}>
                            <h2>Usage Statistics</h2>
                            <div className={styles.tab_body}>
                                <div className={styles.usage_container}>
                                    <p className={styles.usage_label}>Repos</p>
                                    <p className={styles.usage_value}>3</p>
                                </div>
                                <div className={styles.usage_container}>
                                    <p className={styles.usage_label}>Features Extracted</p>
                                    <p className={styles.usage_value}>15</p>
                                </div>
                                <div className={styles.usage_container}>
                                    <p className={styles.usage_label}>Features Deployed</p>
                                    <p className={styles.usage_value}>5</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.tab}>
                            <h2>Community Highlights</h2>
                            <div className={styles.tab_body}>
                                <div className={styles.post}>
                                    <p className={styles.post_tag}>Featured</p>
                                    <p className={styles.post_name}>Introducing SpeedBuild</p>
                                    <p className={styles.post_description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum reiciendis et provident sapiente? Labore corporis in laboriosam animi error minus architecto, iusto nulla. Modi dolor accusamus dolore officia quisquam dolorum.</p>
                                    <div className={styles.post_image}>
                                        <Image src={postImage} alt="Post image"/>
                                    </div>
                                    <div className={styles.tab_btn}>View Post</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.tab}>
                            <h2>Tutorials</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;