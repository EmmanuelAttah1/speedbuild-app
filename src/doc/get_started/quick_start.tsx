import styles from "../doc.module.css"

// Quick Start - Extraction

const QuickStart=()=>{
    return (
        <div className={styles.DocContainer}>
            <p>Speedbuild currently support just Django and Express framework.</p>
            <p>SpeedBuild can either extract features by their names or their route.</p>

            <p>SpeedBuild extraction follow this format : <b>{"speedbuild extract <name_of_feature_or_route> <path_to_feature> --<framework>"}</b></p>
            <p>NOTE : <b>we need to be in the project root directory before we can run this command.</b></p>

            <div className={styles.DocSection}>
                <p className={styles.cli_heading}># Extract with name</p>
                <p>For example if we wanted to extract the CheckoutCart feature from a django project, we will do</p>
                <div className={styles.command}>{"speedbuild extract CheckoutCart shop/views.py --django"}</div>
                <p>This Extract the CheckoutCart feature from the <b>shop</b> django app</p>
            </div>

            <div className={styles.DocSection}>
                <p className={styles.cli_heading}># Extract with route</p>
                <div className={styles.command}>speedbuild extract /home routes/contact_routes.js --express </div>
                <p>This command will scan the <b>routes/contact_routes.js</b> file, identify and extract the feature attached to the specified route "/home".</p>
            </div>
        </div>
    )
}

export default QuickStart