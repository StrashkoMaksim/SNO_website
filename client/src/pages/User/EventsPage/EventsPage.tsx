import cn from "classnames";
import { FC, useState } from "react";
import EventsWithPagination from "./EventsWithPagination/EventsWithPagination";
import styles from './EventsPage.module.scss'

const EventsPage: FC = () => {

    const [oldEvents, setOldEvents] = useState<boolean>(false)

    const toggleOldEvents = () => setOldEvents(!oldEvents)

    return (
        <section className={cn('section')}>
            <div className={cn('container')}>

                <div className={styles.header}>
                    <h1>{oldEvents ? 'Все' : 'Ближайшие'} мероприятия</h1>
                    <button
                        className={styles.showAllEventsBtn}
                        onClick={toggleOldEvents}
                    >
                        Показать {oldEvents ? ' ближайшие' : ' все'} мероприятия
                    </button>
                </div>

                <EventsWithPagination oldEvents={oldEvents}/>
            </div>
        </section>
    )
}

export default EventsPage;