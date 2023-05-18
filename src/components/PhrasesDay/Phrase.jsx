import React from 'react'
import styles from '../../styles/Phrase.module.css'
import SpeechTextButton from '../SpeechTextButton/SpeechTextButton'
import useTranslate from '../../hooks/useTranslate'


const Phrase = ({ phrase }) => {

    const { translateText, TranslateBtn } = useTranslate()

    return (
        <div className={styles.textwrapper} >
            <p className={styles.paragraph}><span className={styles.span}>Phrase: </span>"{translateText || phrase}".</p>
            <div className={styles.controllers}>
                <SpeechTextButton text={phrase} color={'purple'} />
                <TranslateBtn text={phrase} color={'purple'} />
            </div>
        </div>
    )
}




export default Phrase