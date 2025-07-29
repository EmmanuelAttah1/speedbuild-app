import Link from "next/link"
import styles from "../doc.module.css"

const ConfigurationDoc=()=>{
    return (
        <div className={styles.DocContainer}>

            <div className={styles.DocSection}>
                <p className={styles.cli_heading}>Visit the LLM configuration page on commands to configure LLM </p>
                <Link href="/llm-configuration" className={styles.command}>{"https://app.speedbuild.dev/llm-configuration"}</Link>
                <p>Currently we support only OpenAI.</p>
                <p>We are working actively to support more models both open source, local models and commercial providers.</p>
            </div>
        </div>
    )
}

export default ConfigurationDoc