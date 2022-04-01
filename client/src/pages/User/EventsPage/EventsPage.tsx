import cn from "classnames";
import React, { useEffect, FC } from "react";
import http from "../../../assets/http-config";
import Events from "./Events";

const EventsPage: FC = () => {

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

        window.scroll(0, 0)

    }, [])


    return (
        <section className={cn('section')}>
            <div className={cn('container')}>
                <h1>Ближайшие мероприятия</h1>
                <Events events={events} />
            </div>
        </section>
    )
}

export default EventsPage;