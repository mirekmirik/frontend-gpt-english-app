import { faDragon } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, resetAll } from "../../features/userSlice";
import { useNavigate } from "react-router";
import styles from '../../styles/Header.module.css'


const Header = () => {
    const { currentUser } = useSelector(({ user }) => user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        navigate('/auth/login')
        dispatch(resetAll())
    }

    return (
        <div className={styles.header}>
            {currentUser ? <>
                <FontAwesomeIcon icon={faDragon} size='xl' style={{ color: "#7036a1" }} />
                <FontAwesomeIcon onClick={logoutHandler} icon={faRightFromBracket} size='xl' style={{ color: "#7036a1" }} />
            </> :
                <FontAwesomeIcon icon={faDragon} size='xl' style={{ color: "#7036a1" }} />}
        </div >
    )
}

export default Header