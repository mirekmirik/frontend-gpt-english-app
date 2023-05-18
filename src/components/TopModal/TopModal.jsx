import React from 'react'
import ReactDOM from 'react-dom'

import styles from '../../styles/TopModal.module.css'

const TopModal = ({ error, success, message }) => {

    const portalElement = document.getElementById('overlays')

    return (
        <div className={styles.wrapper}>
            {ReactDOM.createPortal(<p>{message}</p>, portalElement)}
        </div>
    )
}

export default TopModal