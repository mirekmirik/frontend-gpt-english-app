import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../features/userSlice'
import { getTopWords, sendToDBTopWords, setCloseNotif } from '../../features/phrasesSlice'
import PhrasesDay from '../PhrasesDay/PhrasesDay'
import Wrapper from '../../UI/Wrapper'
import styles from '../../styles/Home.module.css'
const Home = () => {

  const dispatch = useDispatch()
  const { currentUser: { userId } } = useSelector(({ user }) => user)
  const { text } = useSelector(({ speech }) => speech)
  const { phrases, isServerPhrases, allPhrases, closeNotif } = useSelector(({ phrases }) => phrases)

  useEffect(() => {
    if (allPhrases.length === 0) {
      dispatch(getUser(userId))
    }
  }, [dispatch])


  useEffect(() => {
    if (!isServerPhrases) {
      if (!phrases.length && !allPhrases.length && text) {
        dispatch(getTopWords())
        return;
      }
      const intervalId = setInterval(() => {
        if (phrases.length < 5) {
          dispatch(getTopWords())
          clearInterval(intervalId)
        }
      }, 21000)
      if (phrases.length === 5) dispatch(sendToDBTopWords())

      return () => clearInterval(intervalId)
    }
  }, [phrases, isServerPhrases])

  return (
    <Wrapper>
      {!closeNotif && <div className={styles.wrapper_text}>
        <div className={styles.text}>
          <h3 className={styles.title}>There are your 5 words for today. (just wait 20 seconds for each)</h3>
          <hr className={styles.line}></hr>
          <p className={styles.title}>P.S every day you will get new 5 words :)</p>
        </div>
        <button className={styles.button} onClick={() => dispatch(setCloseNotif(true))}>
          <div className={styles.close}>X</div>
        </button>
      </div>}
      <PhrasesDay />
    </Wrapper >
  )
}

export default Home