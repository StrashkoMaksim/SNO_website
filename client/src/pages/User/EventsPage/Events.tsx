import styles from "./Events.module.scss"
import cn from "classnames";
import Event from "../../../components/Event/Event";
import { FC } from "react";

interface EventsProps {
    events: any[],
    admin?: boolean,
    openModalForm?: Function
}

const Events: FC<EventsProps> = ({ events, admin, openModalForm }) => {
    return (
        <div className={styles.Events}>
            <div className={cn(styles.tableTitles, { [styles['tableTitles-admin']]: admin })}>
                <span>Название</span>
                <span>Дата</span>
                <span>Организатор</span>
            </div>
            {events.map(event => <Event
                id={event._id}
                key={event._id}
                name={event.name}
                date={event.date}
                organizerText={event.organizerText}
                organizerLink={event.organizerLink}
                openModalForm={openModalForm}
                isAuth={admin} />)}
        </div>
    )
}

export default Events;