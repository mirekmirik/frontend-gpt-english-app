import React from 'react'
import styles from '../../styles/Handling.module.css'
import Spinner from '../Spinner/Spinner'

const Handling = ({isLoading, error, success}) => {
    return (
        <>
            {isLoading && <Spinner />}
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
        </>
    )
}

export default Handling