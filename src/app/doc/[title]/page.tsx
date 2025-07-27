"use client"
import { CenterPageSkeleton } from "@/app/components/center_skeleton/center_skeleton"
import { NavBar } from "@/app/components/navbar/navbar"

import styles from "./style.module.css"
import { useState } from "react"
import GetStartedDoc from "@/doc/get_started/installation";

const MenuSection=(props:{name:string})=>{
    const [expand, setExpand] = useState<boolean>(false)

    const toogleClass = expand ? `${styles.sectionToggleBtn} ${styles.sectionToggleBtnOpen}` : styles.sectionToggleBtn

    return (
        <div className={styles.menuSection}>
            <div className={styles.sectionHead}>
                <div className={toogleClass} onClick={()=>{setExpand(!expand)}}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 17V7L15 12L10 17Z" fill="#E6E0E9"/>
                    </svg>
                </div>
                <p className={styles.headSection}>{props.name}</p>
            </div>
            {expand&&<div className={styles.sectionChildren}>
                <p className={styles.sectionChild}>child 1</p>
                <p className={styles.sectionChild}>child 2</p>
                <p className={styles.sectionChild}>child 3</p>
            </div>}
        </div>
    )
}

const DocDetail=()=>{
    const [mobileMenuOpen,setMobileMenuOpenState] = useState<boolean>(false)
    const mobileMenuClasses = mobileMenuOpen ? [styles.mobileMenuTab, styles.menuTabOpen].join(" ") : [styles.mobileMenuTab, styles.menuTabClose].join(" ");
    return(
        <CenterPageSkeleton>
            <NavBar />
            <div className={styles.DocPage}>
                <div className={styles.docContainer}>
                    <div className={styles.menuContainer}>
                        <div>
                            <p className={styles.sectionHeadBold}>First Step</p>
                            <MenuSection name="Installation"/>
                            <MenuSection name="Quick Start"/>
                        </div>
                        <div>
                            <p className={styles.sectionHeadBold}>Core Concepts</p>
                            <MenuSection name="Feature Customization"/>
                            <MenuSection name="LLM Configuration"/>
                        </div>
                        <div>
                            <p className={styles.sectionHeadBold}>Help / Debugging</p>
                            <MenuSection name="FAQ"/>
                            <MenuSection name="Contact Support"/>
                        </div>
                    </div>

                    <div className={styles.docMain}>
                        <div className={styles.mobileMenu}>
                            <div className={styles.menuHead}>
                                <div className={styles.currentMobileMenuTitle}>First Step - Introduction</div>
                                <div className={mobileMenuClasses} onClick={()=>{
                                    setMobileMenuOpenState(!mobileMenuOpen)
                                }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 17V7L15 12L10 17Z" fill="#E6E0E9"/>
                                    </svg>
                                </div>
                            </div>
                            {mobileMenuOpen&&<div>
                                <div>
                                    <p className={styles.sectionHeadBold}>First Step</p>
                                    <MenuSection name="Installation"/>
                                    <MenuSection name="Quick Start"/>
                                </div>
                                <div>
                                    <p className={styles.sectionHeadBold}>Core Concepts</p>
                                    <MenuSection name="Feature Customization"/>
                                    <MenuSection name="LLM Configuration"/>
                                </div>
                                <div>
                                    <p className={styles.sectionHeadBold}>Help / Debugging</p>
                                    <MenuSection name="FAQ"/>
                                    <MenuSection name="Contact Support"/>
                                </div>
                            </div>}
                        </div>
                        <h1>Installation Guide</h1>
                        <GetStartedDoc/>
                        {/* <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`


                            `) }}/> */}
                        <div className={styles.ControllerContainer}>
                            <div className={styles.controller}>
                                <div className={styles.controllerLeft}>
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_78_304)">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.7806 14.5306L16.0306 21.2806C15.7376 21.5737 15.2624 21.5737 14.9694 21.2806C14.6763 20.9876 14.6763 20.5124 14.9694 20.2194L20.4397 14.75H5.75C5.33579 14.75 5 14.4142 5 14C5 13.5858 5.33579 13.25 5.75 13.25H20.4397L14.9694 7.78062C14.6763 7.48757 14.6763 7.01243 14.9694 6.71938C15.2624 6.42632 15.7376 6.42632 16.0306 6.71938L22.7806 13.4694C22.9215 13.6101 23.0006 13.8009 23.0006 14C23.0006 14.1991 22.9215 14.3899 22.7806 14.5306Z" fill="white"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_78_304">
                                        <rect width="24" height="24" fill="white" transform="translate(2 2)"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div className={styles.controllerDetails}>
                                    <p>Previous</p>
                                    <p className={styles.bold}>Linear regression</p>
                                </div>
                            </div>

                            <div className={styles.controller}>
                                <div className={styles.controllerDetails}>
                                    <p>Next</p>
                                    <p className={styles.bold}>Linear regression</p>
                                </div>
                                <div className={styles.controllerRight}>
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_78_304)">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.7806 14.5306L16.0306 21.2806C15.7376 21.5737 15.2624 21.5737 14.9694 21.2806C14.6763 20.9876 14.6763 20.5124 14.9694 20.2194L20.4397 14.75H5.75C5.33579 14.75 5 14.4142 5 14C5 13.5858 5.33579 13.25 5.75 13.25H20.4397L14.9694 7.78062C14.6763 7.48757 14.6763 7.01243 14.9694 6.71938C15.2624 6.42632 15.7376 6.42632 16.0306 6.71938L22.7806 13.4694C22.9215 13.6101 23.0006 13.8009 23.0006 14C23.0006 14.1991 22.9215 14.3899 22.7806 14.5306Z" fill="white"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_78_304">
                                        <rect width="24" height="24" fill="white" transform="translate(2 2)"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </CenterPageSkeleton>
    )
}

export default DocDetail