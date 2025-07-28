import styles from "../doc.module.css"

const DeployDoc=()=>{
    return (
        <div className={styles.DocContainer}>
            <div className={styles.DocSection}>
                <p className={styles.cli_heading}># Deploy Feature to new project</p>
                <p><b>Before deploying a feature, navigate to the main directory of your target project.</b> Then run : </p>
                <div className={styles.command}>{"speedbuild deploy <feature_name>"}</div>
                <p>Then just follow the prompt.</p>
                <p>You will be prompted to deploy the feature as it is, or Adapt it to fit your project.</p>
            </div>

            <div className={styles.DocSection}>
                <p className={styles.cli_heading}># Use the List command, to see the names of all extracted features</p>
                <div className={styles.command}>{"speedbuild list"}</div>
            </div>

            <div className={styles.DocSection}>
                <p className={styles.cli_heading}># Undo the last deployment (if needed)</p>
                <div className={styles.command}>{"speedbuild undo"}</div>
                <p>Your project is restored to its previous state.</p>
            </div>
        </div>
    )
}

export default DeployDoc