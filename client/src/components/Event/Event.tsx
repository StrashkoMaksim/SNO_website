import styles from "./Event.module.scss"
import React, { FC } from "react"
import editIcon from "../../assets/img/EditIcon.svg"
import cn from "classnames"
import { RequestType } from "../../pages/Admin/AdminEventsPage/AddEventModal"
import EditButton from "../EditButton/EditButton";

interface EventProps {
    id: string
    name: string,
    date: string,
    organizerText: string,
    organizerLink: string,
    isAuth?: boolean,
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
                <span className={cn(styles.Label, 'SemiBold')}>
                    Название
                </span>
                <p className={cn(styles.InfoText, 'Light')}>
                    {name}
                </p>
            </div>
            <div className={styles.Event__Data}>
                <span className={cn(styles.Label, 'SemiBold')}>
                    Дата
                </span>
                <p className={cn(styles.InfoText, 'Light')}>
                    {convertDate(date)}
                </p>
            </div>
            <div className={styles.Event__Data}>
                <span className={cn(styles.Label, 'SemiBold')}>
                    Организатор
                </span>
                <a className={cn(styles.organizerLink, 'Light')} href={organizerLink} target='_blank'>
                    {organizerText}
                </a>
            </div>
            <EditButton onClick={handleEditBtn} additionalClass={styles.editButton} />
        </div>
    )
}

export default Event