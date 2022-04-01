import styles from "./LinkButton.module.scss"
import {Link} from "react-router-dom";
import cn from "classnames";

export interface ButtonProps {
    text: string,
    imgSrc?: string,
    style?: {},
    extraClass?:string,
    to: string
}

const LinkButton = ({ style, text, imgSrc, extraClass, to }: ButtonProps) => {
    return (
        <Link style={style} className={cn(styles.DefaultButton, extraClass)} to={to}>
            {imgSrc && <img src={imgSrc} alt={text}/>}
            <span>{text}</span>
        </Link>
    )
}

export default LinkButton;