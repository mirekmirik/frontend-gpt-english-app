import React from 'react'
import styles from '../../styles/Spinner.module.css'

const Spinner = () => {
    return (
        <div class={styles['spinner']}>
            <div class={styles['globe']}></div >
        </div>

    )
}

export default Spinner