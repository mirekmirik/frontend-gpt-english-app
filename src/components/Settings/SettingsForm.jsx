import React, { useCallback, useEffect, useState } from 'react'
import styles from '../../styles/SettingsForm.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../features/userSlice';
import Handling from '../Handling/Handling';


const OPTIONS = [
    {
        label: 'A1',
        value: 'A1'
    },
    {
        label: 'A2',
        value: 'A2'
    },
    {
        label: 'B1',
        value: 'B1'
    },
    {
        label: 'B2',
        value: 'B2'
    },
    {
        label: 'C1',
        value: 'C1'
    },
    {
        label: 'C2',
        value: 'C2'
    },
];

const SettingsForm = () => {



    const dispatch = useDispatch()
    const { currentUser: { userId, englishLvl, login }, isLoading } = useSelector(({ user }) => user)




    const defaultValues = {
        login,
        englishLvl,
    }



    const [values, setValues] = useState({ ...defaultValues, password: '', newPassword: '' })
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        setSuccess(null)
        setError(null)
    }, [])


    const handleChange = ({ target: { name, value } }) => {
        setValues((prevState) => ({ ...prevState, [name]: value }))
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        setSuccess(null)
        setError(null)
        try {
            const resultAction = await dispatch(updateUser({ ...values, id: userId }))
            const valueFromAction = resultAction.payload

            if (updateUser.fulfilled.match(resultAction)) {
                setSuccess(`User have updated succesfully!`)
            } else {
                setError(valueFromAction)
            }
        } catch (error) {
            setError('An error occurred. Please try again.')
        }
    }



    return (
        <div>
            <form className={styles.form} onSubmit={submitHandler}>
                <Handling success={success} error={error} isLoading={isLoading} />
                <label>Change login:</label>
                <input name='login' type="text" className={styles.input} value={values.login} onChange={handleChange} />
                <label>Old password:</label>
                <input name='password' type="text" className={styles.input} onChange={handleChange} />
                <label >New password:</label>
                <input name='newPassword' type="text" className={styles.input} onChange={handleChange} />
                <label>Change english lvl:</label>
                <div className={styles.optionlvl}>
                    <select name='englishLvl' className={styles.select} onChange={handleChange}>
                        <option value={""} disabled>PICK YOUR ENGLISH LVL</option>
                        {OPTIONS.map(({ label, value }, idx) => {
                            return <option className={styles.option} key={idx} value={values.englishLvl}>{label}</option>
                        })}
                    </select>
                </div>
                <button type='submit' className={styles.submit}>CONFIRM</button>
            </form>
        </div>
    )
}

export default SettingsForm