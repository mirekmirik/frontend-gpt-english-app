import React from 'react'
import useTranslate from '../../../../hooks/useTranslate'
import SpeechTextButton from '../../../SpeechTextButton/SpeechTextButton'
import styles from '../../../../styles/GeneralQuestions.module.css'

const Option = ({ value, key, onClick }) => {

    const { translateText, TranslateBtn } = useTranslate()

    return (
        <div className={styles.option} key={key}>
            <p onClick={onClick}>{translateText || value}</p>
            <div className={styles.controllers}>
                <SpeechTextButton text={value} />
                <TranslateBtn text={value} />
            </div>
        </div>
    )
}

export default Option