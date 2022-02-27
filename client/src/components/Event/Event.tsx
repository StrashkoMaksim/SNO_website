import styles from "./Event.module.scss"
import React, { FC } from "react"
import editIcon from "../../assets/img/EditIcon.svg"
import cn from "classnames"

interface EventProps {
    name: string,
    date: string,
    organizerText: string,
    organizerLink: string,
    isAuth: boolean,
    extraClass?: string
}

const Event: FC<EventProps> = ({ name, date, organizerText, organizerLink, isAuth, extraClass }) => {
    return (
        <div className={cn(styles.Event, { [styles['Event-admin']]: isAuth })}>
            <div className={styles.Event__Data}>
                <span className={cn(styles.Label, styles.SemiBold)}>
                    Название
                </span>
                <p className={cn(styles.InfoText, styles.Light)}>
                    {name}
                </p>
            </div>
            <div className={styles.Event__Data}>
                <span className={cn(styles.Label, styles.SemiBold)}>
                    Дата
                </span>
                <p className={cn(styles.InfoText, styles.Light)}>
                    {date}
                </p>
            </div>
            <div className={styles.Event__Data}>
                <span className={cn(styles.Label, styles.SemiBold)}>
                    Организатор
                </span>
                <a className={cn(styles.organizerLink, styles.Light)} href={organizerLink}>
                    {organizerText}
                </a>
            </div>
            <img className={styles.editButton} src={editIcon} alt="" />
        </div>
    )
}

export default Event;