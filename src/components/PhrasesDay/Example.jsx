import React from 'react'
import styles from '../../styles/Phrase.module.css'
import SpeechTextButton from '../SpeechTextButton/SpeechTextButton'
import useTranslate from '../../hooks/useTranslate'


const Example = ({ example, phrase }) => {

    const { translateText, TranslateBtn } = useTranslate()

    // in Phrase i have 'It's a small world'

    // in Example i have 'Wow, I can't believe we both went to the same high school! It's a small world after all.'

    // i need to find phrase in example and set font-weight 600 for it. how i can do that?

    return (
        <div className={styles.textwrapper}>
            <p className={styles.paragraph}><span className={styles.span}>Example: </span>{translateText || example}</p>
            <div className={styles.controllers}>
                <SpeechTextButton text={example} color={'purple'} />
                <TranslateBtn text={example} color={'purple'} />
            </div>
        </div>

    )
}



export default Example