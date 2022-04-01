import styles from './Grant.module.scss'
import cn from "classnames"
import { FC } from "react"

interface GrantProps {
    achievement: string,
    bonusPoints: string | number,
    extraInfo: string
}

const Grant: FC<GrantProps> = ({ achievement, bonusPoints, extraInfo }) => {
    return (
        <div className={styles.Grant}>
            <div className={styles.Grant__Data}>
                <span className={cn(styles.Label, 'SemiBold')}>
                    Достижение
                </span>
                <p className={cn(styles.InfoText, 'Light')}>
                    {achievement}
                </p>
            </div>
            <div className={styles.Grant__Data}>
                <span className={cn(styles.Label, 'SemiBold')}>
                    Количество баллов
                </span>
                <p className={cn(styles.InfoText, 'Light')}>
                    {bonusPoints} баллов
                </p>
            </div>
            <div className={styles.Grant__Data}>
                <span className={cn(styles.Label, 'SemiBold')}>
                    Дополнительно
                </span>
                <p className={cn(styles.InfoText, 'Light')}>
                    { extraInfo }
                </p>
        </div>
        </div >
    )
}

export default Grant;