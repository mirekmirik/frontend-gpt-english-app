import { useCallback, useState } from "react"
import styles from '../styles/SpeechTextButton.module.css'


const useTranslate = () => {

    const [translateText, setTranslateText] = useState('')

    const translateTextHandler = useCallback(async (text) => {
        try {
            if (translateText !== '') {
                setTranslateText('')
                return;
            }
            const response = await fetch(`${BASE_URL}/translate`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text
                })
            })
            const data = await response.json()
            setTranslateText(data.text)
        } catch (err) {
            console.log(err)
        }
    }, [translateText])

    const TranslateBtn = (props) => {

        return (
            <button className={styles.button} ><i className="fa-solid fa-language" onClick={() => translateTextHandler(props.text)} style={{ color: props.color || "#f7d725" }}></i></button>
        )
    }


    return {
        translateText,
        translateTextHandler,
        TranslateBtn
    }


}


export default useTranslate