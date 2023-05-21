import styles from '../../styles/SpeechTextButton.module.css'

const HideTextButton = (props) => {
    return (
        <button className={styles.button}>
            <i class="fa-solid fa-eye-slash mr-2" onClick={props.onClick} style={{ color: "#f7d725" }}></i>
        </button>
    )
}

export default HideTextButton