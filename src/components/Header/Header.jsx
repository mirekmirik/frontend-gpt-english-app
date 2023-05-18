import { faDragon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import styles from '../../styles/Header.module.css'


const Header = () => {
    const location = useLocation()
    const isAuthPage = location.pathname === '/auth'
    let icon = <FontAwesomeIcon icon={faDragon} size='xl' style={{ color: "#7036a1", }} className='cursor-pointer' />;
    if (!isAuthPage) {
        icon = <Link to='/'><FontAwesomeIcon icon={faDragon} size='xl' style={{ color: "#7036a1", }} className='cursor-pointer' /></Link>
    }

    return (
        <div className={`md:container md:mx-auto h-7 top-0 shadow-sm ${styles.header} w-screen px-2 flex items-center`}>
            {icon}
        </div >
    )
}

export default Header