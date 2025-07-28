import styles from "../doc.module.css"

// Quick Start - List Extracted Features

const ExtractionListDoc=()=>{
    return(
        <div className={styles.DocContainer}>
            <div className={styles.DocSection}>
                <p className={styles.cli_heading}># See all Extracted features</p>
                <div className={styles.command}>speedbuild list</div>

                
                <div className={styles.CliContainer}>
                    <p>This command help you see all of the features you have extracted, an example output is: </p>
                    <div className={styles.sampleCLIOutput}>
                        <p className={styles.cli_heading}>## ALL EXTRACTED FEATURES ##</p>
                        <br/>
                        <p>1) speed_build_GetPaidUnProcessedOrders</p>
                        <p>2) speed_build_clapForReview</p>
                        <p>3) speed_build_ConfirmPayment</p>
                        <p>4) speed_build_findSupplements</p>
                        <p>5) speed_build_InitiatePayment</p>

                    </div>
                </div>

                <p>{"The naming convention for a feature template is speed_build_<Feature_Name>"}</p>
            </div>
        </div>
    )
}

export default ExtractionListDoc