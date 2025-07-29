import Link from "next/link"
import styles from "../doc.module.css"

const FeatureDoc=()=>{
    return (
        <div className={styles.DocContainer}>

            <div className={styles.DocSection}>
                <div className={styles.textBlock}>
                    Speedbuild gives you the option to customize and adapt your extracted templates in plain English to fit the project you want to deploy them to.
                    To achieve this we integrate with Large Language Providers (LLMs).
                </div>
                <div className={styles.textBlock}>
                    We then prompt these LLMs to adapt features while retaining structure and architecture of the original template.
                </div>

                <div className={styles.textBlock}>
                    To use the Template Customization Feature, you need to provide your own API key to these LLM, during customization speedbuild will use your key to make local LLM requests to these providers and our prompts/ work-flow to customize your feature.
                </div>

                <div className={styles.textBlock}><b>NS : Your LLM API keys are stored locally on your devices and we do not have access to them</b></div>

                <div className={styles.textBlock}>
                    See the next Section for more Information on configuring LLM Customization and the current models/ providers this alpha version supports.
                </div>
            </div>
        </div>
    )
}

export default FeatureDoc