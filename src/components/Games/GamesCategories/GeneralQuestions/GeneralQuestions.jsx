import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../../../../UI/Wrapper'
import { getNewGeneralQuestion, pretendRole, resetGame, setCategory, setHideMode, setMessages } from '../../../../features/gameSlice'
import Score from '../../Score'
import GameTotal from '../../GameTotal'
import Handling from '../../../Handling/Handling'
import Option from './Option'
import useTranslate from '../../../../hooks/useTranslate'
import SpeechTextButton from '../../../SpeechTextButton/SpeechTextButton'
import HideTextButton from '../../../HideTextButton/HideTextButton'
import Spinner from '../../../Spinner/Spinner'
import styles from '../../../../styles/GeneralQuestions.module.css'



const TOTAL_QUESTIONS = 7;

const GeneralQuestions = () => {
    const dispatch = useDispatch()
    const categoryInputRef = useRef()

    const
        { category, score, hideMode, incorrectAnswers, correctAnswers, incorrect, messages, questionMessage, questionOptions }
            = useSelector(({ game }) => game)

    const { translateText, TranslateBtn } = useTranslate()
    const { currentUser: { englishLvl } } = useSelector(({ user }) => user)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        return () => {
            dispatch(resetGame())
        }
    }, [dispatch])


    useEffect(() => {
        if (category) {
            dispatch(pretendRole({ englishLvl, category }))
        }
    }, [category])


    useEffect(() => {
        const newQuestion = () => {
            if (messages.length > 0) {
                dispatch(getNewGeneralQuestion(messages))
            }
        }
        if (messages.length < 2) {
            newQuestion()
        }
        if (messages?.at(-1)?.role !== 'assistant' && correctAnswers <= TOTAL_QUESTIONS) {
            const intervalId = setInterval(() => {
                newQuestion()
                clearInterval(intervalId)
                setLoading(false)
            }, 21000)
            return () => clearInterval(intervalId)
        }
    }, [messages])



    const submitAnswer = (event) => {
        event.preventDefault()
        const { target: { innerText } } = event
        const answer = innerText
        const myAnswer = { "role": "user", "content": answer }
        dispatch(setMessages(myAnswer))
        setLoading(true)
    }

    if (correctAnswers > TOTAL_QUESTIONS) {
        return <GameTotal incorrectAnswers={incorrectAnswers} score={score} totalQuestions={TOTAL_QUESTIONS} englishLvl={englishLvl} />
    }

    const submitCategory = (event) => {
        event.preventDefault()
        dispatch(setCategory(categoryInputRef.current.value))
    }

    const randomCategory = (event) => {
        event.preventDefault()
        dispatch(setCategory('random'))
    }

    const hideModeHandler = (event) => {
        event.preventDefault()
        if (hideMode) {
            dispatch(setHideMode(false))
        } else {
            dispatch(setHideMode(true))
        }
    }

    if (!category) {
        return (
            <Wrapper>
                <div className={styles.content}>
                    <p className={styles.text}>Just type your category for general questions :D</p>
                    <div className={styles.random} >
                        <button onClick={randomCategory} className={styles.button}>Random Category</button>
                    </div>
                    <div className={styles.category}>
                        <input ref={categoryInputRef} className={styles.input} type='text' placeholder='Your category...' />
                        <button className={styles.button} onClick={submitCategory}>Submit</button>
                    </div>
                </div>
            </Wrapper>
        )
    }



    return (
        <Wrapper>
            {questionMessage &&
                <div className={styles.wrap}>
                    <p className={styles.totalquestions}>Total Questions: {!correctAnswers ? 0 : correctAnswers}/{TOTAL_QUESTIONS}</p>
                    <div className={styles.total}>
                        <Score score={score} />
                    </div>
                    <Handling error={incorrect && 'incorrect!'} />
                    {!hideMode && <p className={styles['question-text']}>{translateText || questionMessage}</p>}
                    <div className={styles.controllers}>
                        <TranslateBtn text={questionMessage} />
                        <SpeechTextButton text={questionMessage} />
                        <HideTextButton onClick={hideModeHandler} />
                    </div>
                    {loading && <Spinner />}
                    {loading && <p style={{ color: 'yellow', textAlign: 'center' }}>Just wait 20 seconds... API have limits 3 req/1m</p>}
                    <div className={styles['options-wrap']}>
                        {
                            Object.entries(questionOptions).map(([_, value], idx) => {
                                return (
                                    <Option value={value} key={idx} onClick={submitAnswer} />
                                )
                            })
                        }
                    </div>
                </div>}
        </Wrapper>
    )
}

export default GeneralQuestions