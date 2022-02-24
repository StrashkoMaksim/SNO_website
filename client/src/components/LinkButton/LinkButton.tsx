import styles from "./LinkButton.module.scss"
import {Link} from "react-router-dom";

export interface ButtonProps {
    text: string,
    imgSrc?: string,
    style?: {},
    to: string
}

const LinkButton = ({ style, text, imgSrc, to }: ButtonProps) => {
    return (
        <Link style={style} className={styles.DefaultButton} to={to}>
            {imgSrc && <img src={imgSrc} alt={text}/>}
            <span>{text}</span>
        </Link>
    )
}

export default LinkButton;