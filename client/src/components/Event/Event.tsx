import styles from "./Event.module.scss"
import React, { FC } from "react"
import editIcon from "../../assets/img/EditIcon.svg"
import cn from "classnames"
import { RequestType } from "../../pages/AdminEventsPage/AddEventModal"

interface EventProps {
    id: string
    name: string,
    date: string,
    organizerText: string,
    organizerLink: string,
    isAuth: boolean,
    openModalForm?: Function,
    extraClass?: string
}

const Event: FC<EventProps> = ({ id, name, date, organizerText, organizerLink, isAuth, openModalForm, extraClass }) => {

    // Переводит дату из серверного timestamp в читаемый вид
    const convertDate = (date: string) => {
        return date
            .slice(0, 10)
            .split('-')
            .reverse()
            .join('/')
    }

    const handleEditBtn = () => {
        const eventData = {
            id: id,
            name: name,
            date: new Date(date),
            organizerText: organizerText,
            organizerLink: organizerLink,
        }

        if (openModalForm) openModalForm(eventData, RequestType.put)
    }

    return (
        <div className={cn(styles.Event, extraClass, { [styles['Event-admin']]: isAuth })}>
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
                    {convertDate(date)}
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
            <button type="button" className={styles.editButton} onClick={handleEditBtn}>
                <img src={editIcon} alt="" />
            </button>
        </div>
    )
}

export default Event;