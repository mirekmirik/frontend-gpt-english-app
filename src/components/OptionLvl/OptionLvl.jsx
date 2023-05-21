import React, { useEffect, useState } from 'react'
import SpeechTextButton from '../SpeechTextButton/SpeechTextButton';
import styles from '../../styles/OptionLvl.module.css'
import ArrowRight from '../ArrowRight/ArrowRight';
import { useDispatch, useSelector } from 'react-redux';
import { postEnglishLvl } from '../../features/userSlice';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../utils/routes';
import Spinner from '../Spinner/Spinner';
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


const OptionLvl = () => {
    const navigate = useNavigate()
    const { currentUser, isLoading } = useSelector(({ user }) => user)
    const dispatch = useDispatch()

    const [selectedLvl, setSelectedLvl] = useState(null)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)


    useEffect(() => {
        if (currentUser.englishLvl) {
            navigate('/')
        }
    }, [navigate, currentUser.englishLvl])

    const handleChange = ({ target: { value } }) => {
        setSelectedLvl(value)
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        try {
            const resultAction = await dispatch(postEnglishLvl({ login: currentUser.login, englishLvl: selectedLvl || 'A1' }))
            const valueFromAction = resultAction.payload
            if (postEnglishLvl.fulfilled.match(resultAction)) {
                setSuccess(`Вы успешно выбрали ваш уровень английского ${valueFromAction}`)
                navigate(ROUTES.HOME)
            } else {
                setError(valueFromAction)
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    }





    return (
        <div className={styles.wrapper}>
            <Handling error={error} success={success} isLoading={isLoading} />
            {/* {isLoading && <Spinner />}
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>} */}
            <div className={styles.picklvl}>
                <p className={styles.text}>Pick your english lvl:</p>
                <SpeechTextButton text={"Pick your english level"} />
            </div>
            <div className={styles.optionlvl}>
                <select className={styles.select} onChange={handleChange}>
                    <option value={""} disabled>PICK YOUR ENGLISH LVL</option>
                    {OPTIONS.map(({ label, value }, idx) => {
                        return <option className={styles.option} key={idx} value={value}>{label}</option>
                    })}
                </select>
            </div>
            <ArrowRight onClick={submitHandler} />
        </div>
    )
}

export default OptionLvl