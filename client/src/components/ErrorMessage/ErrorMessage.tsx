import styles from "./ErrorMessage.module.scss"
import errorMark from '../../assets/img/errorIcon.svg'
import cn from "classnames"
import { FC } from "react"

interface ErrorMessageProps {
    errMessage: string
}

const ErrorMessage: FC<ErrorMessageProps> = ({ errMessage }) => {
    return (
        <div className={cn(styles.checkMark, styles['checkMark-error'], { [styles['checkMark-active']]: errMessage !== '' })}>
            <img src={errorMark} alt="check mark icon" />
            <span>{errMessage}</span>
        </div>
    )
}

export default ErrorMessage