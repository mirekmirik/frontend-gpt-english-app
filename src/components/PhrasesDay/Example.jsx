import React from 'react'
import styles from '../../styles/Phrase.module.css'
import SpeechTextButton from '../SpeechTextButton/SpeechTextButton'
import useTranslate from '../../hooks/useTranslate'


const Example = ({ example, phrase }) => {

    const { translateText, TranslateBtn } = useTranslate()
    return (
        <div className={styles.textwrapper}>
            <p className={styles.paragraph}><span className={styles.span}>Example: </span>{translateText || example}</p>
            <div className={styles.controllers}>
                <SpeechTextButton text={example}  />
                <TranslateBtn text={example}  />
            </div>
        </div>

    )
}



export default Example