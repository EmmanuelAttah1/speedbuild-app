"use client"
import { CenterPageSkeleton } from "@/app/components/center_skeleton/center_skeleton"
import { NavBar } from "@/app/components/navbar/navbar"

import styles from "./style.module.css"
import { useState } from "react"
import GetStartedDoc from "@/doc/get_started/installation";
import QuickStart from "@/doc/get_started/quick_start"
import ExtractionListDoc from "@/doc/get_started/list_extraction"
import DeployDoc from "@/doc/get_started/deploy"
import { useParams, useSearchParams } from "next/navigation"
import Link from "next/link"
import ConfigurationDoc from "@/doc/llm_configuration/configuration"
import FeatureDoc from "@/doc/feature_customization/customization"

const MenuSection=(props:{
    name:string,
    hasChildren?:{
        title:string,
        href:string
    }[],
    href?:string
})=>{
    const [expand, setExpand] = useState<boolean>(false)

    const toogleClass = expand ? `${styles.sectionToggleBtn} ${styles.sectionToggleBtnOpen}` : styles.sectionToggleBtn

    return (
        <div className={styles.menuSection}>
            <div className={styles.sectionHead}>
                {props.href?<Link href={props.href} className={styles.headSection}>{props.name}</Link>:<p className={styles.headSection} onClick={()=>{setExpand(!expand)}}>{props.name}</p>}
                <div className={toogleClass} onClick={()=>{setExpand(!expand)}}>
                    {props.hasChildren&&<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 17V7L15 12L10 17Z" fill="#E6E0E9"/>
                    </svg>}
                </div>
                
            </div>
            {expand&&props.hasChildren&&<div className={styles.sectionChildren}>
                {
                    props.hasChildren.map((e)=>(
                        <p key={"child_"+e.title.replaceAll(" ","_")}><Link href={e.href} className={styles.sectionChild}>{e.title}</Link></p>
                    ))
                }
            </div>}
        </div>
    )
}

const DocDetail=()=>{
    const params = useParams()
    const queryParams = useSearchParams()

    const section = queryParams.get("section")
    const title = params['title'] as string
    const [mobileMenuOpen,setMobileMenuOpenState] = useState<boolean>(false)
    const mobileMenuClasses = mobileMenuOpen ? [styles.mobileMenuTab, styles.menuTabOpen].join(" ") : [styles.mobileMenuTab, styles.menuTabClose].join(" ");
    
    
    const DocOrder = [
        {name:"Installation Guide",href:"/doc/Installation_Guide"},
        {name:"Extraction",href:"/doc/Quick_Start_Guide?section=Extraction"},
        {name:"List",href:"/doc/Quick_Start_Guide?section=List"},
        {name:"Deploy",href:"/doc/Quick_Start_Guide?section=Deploy"},
        {name:"Feature Customization",href:"/doc/Core?section=Feature_Customization"},
        {name:"LLM Configuration",href:"/doc/Core?section=LLM_Configuration"},
    ]

    const GetPaginationButton=()=>{
        let tag = title?.replaceAll("_"," ")

        if(section){
            tag = section.replaceAll("_"," ")
        }

        const currentPage = DocOrder.find(e=>e.name === tag)
        let next = null
        let prev = null

        if(currentPage){
            console.log("current page ", currentPage, " lenth total is ", DocOrder.length);
            
            const index = DocOrder.indexOf(currentPage)
            console.log("index is ",index);
            
            if(index > 0 && index < DocOrder.length - 1){
                prev = DocOrder[index-1]
                next = DocOrder[index+1]
            }else if(index === 0){
                prev = null
                next = DocOrder[index+1]
            }else{
                // index === DocOrder.length
                prev = DocOrder[index-1]
                next = null
            }
        }

        return(
            <div className={styles.ControllerContainer}>
                
                    {
                    prev === null ?
                        <div className={[styles.controller, styles.linkDisable].join(" ")}>
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
                                <p className={styles.linkDisable}>Previous</p>
                            </div>
                        </div>
                    :
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
                            <Link href={prev.href} className={styles.controllerDetails}>
                                <p>Previous</p>
                                <p className={styles.bold}>{prev.name}</p>
                            </Link>
                        </div>
                    }

                    {
                        next === null?
                            <div className={styles.controller}>
                                <div className={styles.controllerDetails}>
                                    <p className={styles.linkDisable} >Next</p>
                                </div>
                                <div className={[styles.controllerRight, styles.linkDisable].join(" ")}>
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
                        :
                            <div className={styles.controller}>
                                <Link href={next.href} className={styles.controllerDetails}>
                                    <p>Next</p>
                                    <p className={styles.bold}>{next.name}</p>
                                </Link>
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
                    }


            </div>
        )
    }

    return(
        <CenterPageSkeleton>
            <NavBar />
            <div className={styles.DocPage}>
                <div className={styles.docContainer}>
                    <div className={styles.menuContainer}>
                        <div>
                            <p className={styles.sectionHeadBold}>First Step</p>
                            <MenuSection name="Installation" href="/doc/Installation_Guide"/>
                            <MenuSection name="Quick Start" hasChildren={[
                                {title:"Extraction",href:"/doc/Quick_Start_Guide?section=Extraction"},
                                {title:"List",href:"/doc/Quick_Start_Guide?section=List"},
                                {title:"Deploy",href:"/doc/Quick_Start_Guide?section=Deploy"}
                            ]}/>
                        </div>
                        <div>
                            <p className={styles.sectionHeadBold}>Core Concepts</p>
                            <MenuSection name="Feature Customization" href="/doc/Core?section=Feature_Customization"/>
                            <MenuSection name="LLM Configuration" href="/doc/Core?section=LLM_Configuration"/>
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
                                    <MenuSection name="Installation" href="/doc/Installation_Guide"/>
                                    <MenuSection name="Quick Start" hasChildren={[
                                        {title:"Extraction",href:"/doc/Quick_Start_Guide?section=Extraction"},
                                        {title:"List",href:"/doc/Quick_Start_Guide?section=List"},
                                        {title:"Deploy",href:"/doc/Quick_Start_Guide?section=Deploy"}
                                    ]}/>
                                </div>
                                <div>
                                    <p className={styles.sectionHeadBold}>Core Concepts</p>
                                    <MenuSection name="Feature Customization" href="/doc/Core?section=Feature_Customization"/>
                                    <MenuSection name="LLM Configuration" href="/doc/Core?section=LLM_Configuration"/>
                                </div>
                                <div>
                                    <p className={styles.sectionHeadBold}>Help / Debugging</p>
                                    <MenuSection name="FAQ"/>
                                    <MenuSection name="Contact Support"/>
                                </div>
                            </div>}
                        </div>
                        {title && section?<h1>{title.replaceAll("_", " ") +" : "+section.replaceAll("_"," ")}</h1> : <h1>{title.replaceAll("_", " ")}</h1>}
                        {title === "Installation_Guide"&& <GetStartedDoc/> }
                        {title === "Quick_Start_Guide" && 
                            section === "Extraction"?
                                <QuickStart/>
                            :
                            section === "List"? 
                                <ExtractionListDoc/> 
                                :
                                section ==="Deploy"? <DeployDoc/> 
                                    : 
                                null  
                        }

                        {
                        title === "Core" &&
                            section === "LLM_Configuration"?
                                <ConfigurationDoc/>
                            :
                                section === "Feature_Customization"?
                                <FeatureDoc/>
                                :
                                null
                        }

                        <GetPaginationButton/>
                    </div>
                </div>
            </div>
        </CenterPageSkeleton>
    )
}

export default DocDetail