import React from 'react'
import styles from '../../styles/Phrase.module.css'
import Phrase from './Phrase'
import Example from './Example'

const Phrases = ({ phrases }) => {



    return (
        phrases.map(({ phrase, example }, idx) => {
            return (
                <div className={styles.phrase}>
                    {/* <div className={styles.textwrapper}> */}
                        <Phrase key={idx} phrase={phrase} />
                        <Example key={idx*2} example={example} phrase={phrase} />
                    {/* </div> */}
                </div>

            )
        })

    )
}

export default Phrases