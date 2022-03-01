import styles from "./EventsPage.module.scss"
import cn from "classnames";
import Event from "../../components/Event/Event";
import React, { useEffect, FC } from "react";
import http from "../../assets/http-config";
import Events from "./Events";
import AddEventModal from "../AdminEventsPage/AddEventModal";

interface EventsPageProps {
    admin: boolean
    openModalForm?: Function
}

const EventsPage: FC<EventsPageProps> = ({ admin, openModalForm }) => {

    const [events, setEvents] = React.useState<any[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await http.get(`/event`)
            return response;
        }

        fetchEvents()
            .then(response => {
                if (response.status === 200) {
                    setEvents(response.data)
                }
            })
    }, [])


    return (
        <section className={cn('section')}>
            <div className={cn('container')}>
                <h1>Ближайшие мероприятия</h1>
                <Events events={events} admin={admin} />
            </div>
        </section>
    )
}

export default EventsPage;