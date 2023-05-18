import styles from '../../styles/Score.module.css'

const Score = ({score}) => {
    return (
        <div className={styles.score}>
            <p className="font-bold text-center text-orange-300 mt-7"><i class="fa-solid fa-star" style={{ color: "#f7d725" }}></i> Score: {!score ? 0 : score}</p>
        </div>

    )
}


export default Score