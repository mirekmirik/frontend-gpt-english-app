import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../features/userSlice'
import { ROUTES } from '../../utils/routes'
import Handling from '../Handling/Handling'
import styles from '../../styles/FormAuth.module.css'

const FormRegister = ({ isLoading }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const initialState = {
        login: '',
        password: ''
    }


    const [values, setValues] = useState(initialState)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)


    useEffect(() => {
        setSuccess(null)
        setError(null)
    }, [])

    const handleChange = ({ target: { value, name } }) => {
        setValues((prevState) => ({ ...prevState, [name]: value }))
    }


    const submitHandler = async (event) => {
        event.preventDefault()
        setSuccess(null)
        setError(null)
        try {
            const resultAction = await dispatch(loginUser(values))
            const valueFromAction = resultAction.payload
            if (loginUser.fulfilled.match(resultAction)) {
                setSuccess(`You have succesfull log in!`)
                setValues(initialState)
                navigate(ROUTES.OPTION_LVL)
            } else {
                setError(valueFromAction)
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    }


    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles.title}>Login</div>
            <Handling error={error} success={success} isLoading={isLoading} />
            <label className={styles.label}>Login: </label>
            <input name="login" type="text" value={values.login} className={styles.input} onChange={handleChange} autoComplete='off' />
            <label className={styles.label} >Password:</label>
            <input name="password" type="text" value={values.password} className={styles.input} onChange={handleChange} autoComplete='off' />
            <Link to='/auth/register'>
                <div className={styles.link}>Havent yet registered? Register.</div>
            </Link>
            <button type='submit' className={styles.submit}>Login</button>
        </form>
    )
}

export default FormRegister