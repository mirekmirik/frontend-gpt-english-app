import React from 'react'
import styles from '../../styles/PhrasesDay.module.css'
import { useSelector } from 'react-redux'
import Phrases from './Phrases'
import useTranslate from '../../hooks/useTranslate'
import Handling from '../Handling/Handling'

const PhrasesDay = () => {

    const { phrases, isLoading, errorMessage } = useSelector(({ phrases }) => phrases)


    return (
        <div className={styles.phrases}>
            <Phrases phrases={phrases} />
            <Handling isLoading={isLoading} error={errorMessage} />
        </div>
    )
}

export default PhrasesDay