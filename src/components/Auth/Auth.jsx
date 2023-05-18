import React from 'react'
import FormLogin from './FormLogin'
import { useParams } from 'react-router'
import FormRegister from './FormRegister'
import styles from '../../styles/Auth.module.css'
import { useSelector } from 'react-redux'


const Auth = () => {
    const { type } = useParams()
    
    const { isLoading } = useSelector(({ user }) => user)

    const login = type === 'login'
    const register = type === 'register'

    return (
        <div className={styles.container}>
            <div className={styles.auth}>
                {login && <FormLogin isLoading={isLoading} />}
                {register && <FormRegister isLoading={isLoading} />}
            </div>
        </div>
    )
}

export default Auth