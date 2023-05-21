import { Link, useLocation } from "react-router-dom"
import styles from '../../../styles/GamesCategories.module.css'
import Wrapper from "../../../UI/Wrapper"
import { ROUTES } from "../../../utils/routes"
import GameTotal from "../GameTotal"

const GamesCategories = () => {




    return (
        <Wrapper>
            <div className={styles.gamescategories}>
                <Link to={ROUTES.GAME_GENERAL_QUESTION} className={styles.link}>
                    <div className={styles.category}>
                        <i class="fa-solid fa-vials"></i>
                        <div className="text-center font-bold">General Questions</div>
                    </div>
                </Link>

            </div>
        </Wrapper>

    )
}

export default GamesCategories