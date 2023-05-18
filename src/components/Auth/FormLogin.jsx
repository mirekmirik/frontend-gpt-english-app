import React, { useEffect, useState } from 'react'
import styles from '../../styles/FormAuth.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, loginUser } from '../../features/userSlice'
import TopModal from '../TopModal/TopModal'
import { ROUTES } from '../../utils/routes'
import Spinner from '../Spinner/Spinner'
import Handling from '../Handling/Handling'

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
        console.log(values)
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
            {/* {isLoading && <Spinner />}
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>} */}
            <label className={styles.label}>Login: </label>
            <input name="login" type="text" value={values.login} className={styles.input} onChange={handleChange} />
            <label className={styles.label} >Password:</label>
            <input name="password" type="text" value={values.password} className={styles.input} onChange={handleChange} />
            <Link to='/auth/register'>
                <div className={styles.link}>Havent yet registered? Register.</div>
            </Link>
            <button type='submit' className={styles.submit}>Login</button>
        </form>
    )
}

export default FormRegister