import React, { useEffect, useState } from 'react'
import styles from '../../styles/FormAuth.module.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createUser } from '../../features/userSlice'
import TopModal from '../TopModal/TopModal'
import Spinner from '../Spinner/Spinner'
import Handling from '../Handling/Handling'

const FormRegister = ({ isLoading }) => {


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
            const resultAction = await dispatch(createUser(values))
            const valueFromAction = resultAction.payload
            if (createUser.fulfilled.match(resultAction)) {
                setSuccess(valueFromAction)
                setValues(initialState)
            } else {
                setError(valueFromAction)
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    }


    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles.title}>Register</div>
            <Handling error={error} success={success} isLoading={isLoading} />
            {/* {isLoading && <Spinner />}
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>} */}
            <label className={styles.label}>Login: (at least 4 symbols) </label>
            <input name="login" type="text" value={values.login} className={styles.input} onChange={handleChange} />
            <label className={styles.label} >Password: (at least 4 symbols) </label>
            <input name="password" type="text" value={values.password} className={styles.input} onChange={handleChange} />
            <Link to='/auth/login'>
                <div className={styles.link}>Already register? Login.</div>
            </Link>
            <button type='submit' className={styles.submit}>Submit</button>
        </form>
    )
}

export default FormRegister