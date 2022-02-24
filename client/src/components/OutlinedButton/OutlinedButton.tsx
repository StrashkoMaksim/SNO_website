import {MouseEventHandler} from "react";
import styles from "./OutlinedButton.module.scss"

export interface ButtonProps {
    text: string,
    imgSrc?: string,
    style?: {},
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const OutlinedButton = ({ style, text, imgSrc, onClick }: ButtonProps) => {
    return <button style={style} className={styles.DefaultButton} onClick={onClick}>
        {imgSrc && <img src={imgSrc} alt={text}/>}
        <span>{text}</span>
    </button>
}

export default OutlinedButton;