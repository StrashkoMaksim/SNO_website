import { FC } from 'react';
import styles from './Activity.module.scss'
import {Link} from "react-router-dom";

interface ActivityProps {
    id: string,
    imgSrc: string,
    title: string,
}

const Activity: FC<ActivityProps> = ({ id, imgSrc, title}) => {
    return (
        <Link key={id} to={id} className={styles.activity}>
            <img className={styles.activityLogo} src={`${process.env.REACT_APP_SERVER_URL}/${imgSrc}`} alt="Activity logo" />
            <h2 className={styles.title}>{title}</h2>
        </Link>
    )
}

export default Activity;