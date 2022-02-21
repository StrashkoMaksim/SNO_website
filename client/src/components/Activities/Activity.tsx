import { FC } from 'react';
import styles from './Activity.module.scss'

interface ActivityProps {
    imgSrc: string,
    title: string,
    shortInfo: string
}

const Activity: FC<ActivityProps> = ({ imgSrc, title, shortInfo }) => {
    return (
        <div className={styles.activity}>
            <img className={styles.activityLogo} src={imgSrc} alt="Activity logo" />
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.shortInfo}>{shortInfo}</p>
        </div>
    )
}

export default Activity;