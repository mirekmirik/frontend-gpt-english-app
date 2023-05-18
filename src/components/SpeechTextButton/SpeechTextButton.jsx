import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initSpeech, speak } from "../../features/speechSlice";
import styles from '../../styles/SpeechTextButton.module.css'

const SpeechTextButton = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initSpeech('t'));
    }, []);

    const handleSpeak = (text) => {
        dispatch(speak(text));
    };

    return (
        <button className={styles.button} onClick={() => handleSpeak(props.text)}><i className="fa-solid fa-play" style={{ color: props.color || "#f7d725" }}></i></button>
    )
}


export default SpeechTextButton
