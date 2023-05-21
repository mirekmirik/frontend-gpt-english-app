import React from 'react'
import { ROUTES } from '../../utils/routes'
import { Link } from 'react-router-dom'
import styles from '../../styles/Home.module.css'

const HomeIcon = () => {
    return (
        <div className={styles.home}>
            <Link to={ROUTES.HOME}> <i class="fa-solid fa-house fa-xl" style={{ color: "#6b2470" }}></i></Link>
        </div>
    )
}

export default HomeIcon