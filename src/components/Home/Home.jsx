import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { getUser } from '../../features/userSlice'
import { getTopWords, sendToDBTopWords } from '../../features/phrasesSlice'
import PhrasesDay from '../PhrasesDay/PhrasesDay'
import Wrapper from '../../UI/Wrapper'
import useTranslate from '../../hooks/useTranslate'


const Home = () => {

  const dispatch = useDispatch()

  const { currentUser } = useSelector(({ user }) => user)
  const { phrases, isServerPhrases, allPhrases, isLoading, errorMessage } = useSelector(({ phrases }) => phrases)



  useEffect(() => {
    console.log('call callback')
    if (allPhrases.length === 0) {
      dispatch(getUser(currentUser.userId))
    }
  }, [dispatch])


  useEffect(() => {
    if (!isServerPhrases) {
      const intervalId = setInterval(() => {
        if (phrases.length < 4) {
          dispatch(getTopWords())
        } else {
          if (phrases.length === 4) {
            dispatch(sendToDBTopWords())
          }
          clearInterval(intervalId)
        }
      }, 21000)

      return () => clearInterval(intervalId)
    }
  }, [phrases, isServerPhrases])

  return (
    <Wrapper>
      {/* <div>Home</div> */}
      <PhrasesDay />

    </Wrapper>
  )
}

export default Home