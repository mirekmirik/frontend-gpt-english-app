
import { Link } from "react-router-dom"
import { ROUTES } from "../../utils/routes"
import styles from '../../styles/GameTotal.module.css'
import Wrapper from "../../UI/Wrapper"
import Score from "./Score"

export const GameTotal = (props) => {



    return (
        <Wrapper>
            <div className={styles.gametotal}>
                <div className={styles.content}>
                    <Score score={props.score} />
                    <p>Incorrect answers: {props.incorrectAnswers || 5}</p>
                    <p>Your English lvl: {props.englishLvl || 'B1'}</p>
                    <p>Total questions: {props.totalQuestions || 10}</p>
                    <Link to={ROUTES.GAMES} className={styles.link}>
                        <button className={styles.button}>Return to categories</button>
                    </Link>
                </div>
            </div >
        </Wrapper>

    )
}

export default GameTotal
