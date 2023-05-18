import React from 'react'
import styles from '../../styles/Arrow-right.module.css'

const ArrowRight = (props) => {
    return (
        <button type='submit' onClick={props.onClick} className={styles.button}>
            <i class="fa-solid fa-arrow-right fa-2xl" style={{ color: "#f7d725" }}></i>
        </button >
    )
}

export default ArrowRight