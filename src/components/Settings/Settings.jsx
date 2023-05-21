import React from 'react'
import styles from '../../styles/Settings.module.css'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'


const Settings = () => {
    return (
        <div className={styles.settings}>
            <Link to={ROUTES.SETTINGS} >
                <i class="fa-solid fa-user fa-xl" style={{ color: "#6b2470" }}></i>
                {/* <hr className={styles.line} /> */}
            </Link>
        </div>
    )
}

export default Settings