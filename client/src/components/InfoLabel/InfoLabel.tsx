import { FC } from 'react'
import styles from "./InfoLabel.module.scss"

interface InfoLabelProps {
    text: string
}

const InfoLabel: FC<InfoLabelProps> = ({ text }) => {
    return (
        <div className={styles.InfoLabel}>{text}</div>
    )
}

export default InfoLabel;