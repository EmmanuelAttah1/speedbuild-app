import styles from "../doc.module.css"

const GetStartedDoc=()=>{
    return (
        <div className={styles.DocContainer}>
            <p>To get started with SpeedBuild, follow the steps below:</p>

            <div>
                <p className={styles.cli_heading}># Install SpeedBuild</p>
                Run the following command in your terminal:
            </div>

            <div className={styles.command}>pip install speedbuild</div>

            <div>
                <p className={styles.cli_heading}># Verify Installation</p>
                Check that SpeedBuild was installed successfully:
            </div>

            <div className={styles.command}>speedbuild</div>

            <p>You should see the SpeedBuild CLI help message.</p>

            <div>
                <p className={styles.cli_heading}># Set Up Your Environment</p>
                Authenticate and sync SpeedBuild with the cloud by running:
            </div>

            <div className={styles.command}>speedbuild setup</div>

            <p>This will download the necessary configuration files and prompt you to register or log into your account.</p>
        </div>
    )   
}

export default GetStartedDoc