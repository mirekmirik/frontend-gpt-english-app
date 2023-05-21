import { Link } from "react-router-dom"
import styles from '../../styles/Games.module.css'
import { ROUTES } from "../../utils/routes"

const Games = () => {
    return (
        <div className={styles.games}>

            <Link to={ROUTES.GAMES}><i class="fa-solid fa-gamepad fa-2xl" style={{ color: "#6b2470" }}></i></Link>
            
        </div>
    )
}

export default Games