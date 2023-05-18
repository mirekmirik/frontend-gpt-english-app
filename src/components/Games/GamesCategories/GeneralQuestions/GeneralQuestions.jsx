import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../../../../UI/Wrapper'
import styles from '../../../../styles/GeneralQuestions.module.css'
import { getNewGeneralQuestion, pretendRole, resetGame, setCategory, setHideMode, setMessages } from '../../../../features/gameSlice'
import Score from '../../Score'
import GameTotal from '../../GameTotal'
import Handling from '../../../Handling/Handling'
import Option from './Option'
import useTranslate from '../../../../hooks/useTranslate'
import SpeechTextButton from '../../../SpeechTextButton/SpeechTextButton'
import HideTextButton from '../../../HideTextButton/HideTextButton'

const GeneralQuestions = () => {

    const dispatch = useDispatch()
    const categoryInputRef = useRef()

    const
        { category, score, hideMode, incorrectAnswers, correctAnswers, correct, incorrect, messages, questionMessage, questionOptions, isLoading, error }
            = useSelector(({ game }) => game)

    const { translateText, TranslateBtn } = useTranslate()


    const { currentUser } = useSelector(({ user }) => user)


    useEffect(() => {
        return () => {
            dispatch(resetGame())
        }
    }, [dispatch])


    useEffect(() => {
        if (category) {
            dispatch(pretendRole({ englishLvl: currentUser.englishLvl, category }))
        }
    }, [category])

    useEffect(() => {
        const newQuestion = () => {
            if (messages.length > 0) {
                dispatch(getNewGeneralQuestion(messages))
            }
        }
        if (messages?.[messages.length - 1]?.role !== 'assistant' && correctAnswers <= 10) {
            newQuestion()
        }


    }, [messages])


    const submitAnswer = ({ target: { innerText } }) => {
        const answer = innerText
        const myAnswer = { "role": "user", "content": answer }
        dispatch(setMessages(myAnswer))
    }

    if (correctAnswers > 10) {
        return <GameTotal incorrectAnswers={incorrectAnswers} score={score} totalQuestions={10} englishLvl={currentUser.englishLvl} />
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
                    <p className={styles.totalquestions}>Total Questions: {!correctAnswers ? 0 : correctAnswers}/10</p>
                    <div className={styles.total}>
                        <Score score={score} />
                    </div>

                    <Handling isLoading={isLoading} error={incorrect && 'incorrect!'} />
                    {!hideMode && <p className={styles['question-text']}>{translateText || questionMessage}</p>}
                    <div className={styles.controllers}>
                        <TranslateBtn text={questionMessage} />
                        <SpeechTextButton text={questionMessage} />
                        <HideTextButton onClick={hideModeHandler} />
                    </div>
                    <div className={styles['options-wrap']}>
                        {
                            Object.entries(questionOptions).map(([key, value], idx) => {
                                return (

                                    <Option value={value} key={idx} onClick={submitAnswer} />
                                )
                                // return (
                                //     <div className={styles.option} key={idx}>
                                //         <p onClick={submitAnswer}>{value}</p>
                                //     </div>
                                // )
                            })
                        }

                    </div>
                </div>}

        </Wrapper>
    )
}

export default GeneralQuestions