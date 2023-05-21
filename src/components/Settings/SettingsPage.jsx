import React from 'react'
import Wrapper from '../../UI/Wrapper'
import SettingsForm from './SettingsForm'
import styles from '../../styles/SettingsPage.module.css'


const SettingsPage = () => {
    return (
        <Wrapper>
            <h1 className={styles.title}>Settings Page</h1>
            <SettingsForm />
        </Wrapper>
    )
}

export default SettingsPage