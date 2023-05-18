import styles from '../../styles/Footer.module.css'

const Footer = (props) => {
    return (
        // <div className="fixed flex bottom-0 yellow md:container md:mx-auto h-8 shadow-sm w-full translate-x-2/4 right-2/4 rounded-t-lg">
        <div className={styles.footer}>
            {props.children}
        </div>
        // </div>
    )
}

export default Footer