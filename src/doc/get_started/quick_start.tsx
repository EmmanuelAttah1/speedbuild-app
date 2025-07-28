import styles from "../doc.module.css"

// Quick Start - Extraction

const QuickStart=()=>{
    return (
        <div className={styles.DocContainer}>
            <div className={styles.DocSection}>
                <p className={styles.cli_heading}># Extract a single feature</p>
                <div className={styles.command}>speedbuild extract shop/views.py CheckoutCart</div>
                <p>This Extract the CheckoutCart feature from the <b>shop</b> django app</p>
            </div>

            <div className={styles.DocSection}>
                <p className={styles.cli_heading}># Extract all features from an entire Django app</p>
                <div className={styles.command}>speedbuild extract shop</div>
                <p>This command will scan the <b>shop</b> app, identify extractable features (views, model logics, forms, etc.) and save them as reusable templates.</p>
            </div>

            <div className={styles.DocSection}>
                <p className={styles.cli_heading}># Extract all features from the whole project</p>
                <div className={styles.command}>speedbuild extract </div>
                <p>This captures all apps and features in your Django project. You’ll be able to select and deploy any of them later using speedbuild deploy.</p>
            </div>
        </div>
    )
}

export default QuickStart