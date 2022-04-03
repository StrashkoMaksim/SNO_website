import styles from './EventsWithPagination.module.scss'
import { FC, useEffect, useState } from 'react';
import Pagination from '../../../../components/Pagination/Pagination';
import http from "../../../../assets/http-config";
import Events from '../Events';

const EVENTS_COUNT = 10

interface EWPProps {
    oldEvents: boolean
}

const EventsWithPagination: FC<EWPProps> = ({ oldEvents }) => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalCount, setTotalCount] = useState<number>(0)
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await http.get('/event', { params: { page: currentPage, count: EVENTS_COUNT, oldEvents: oldEvents } })
            return response
        }

        fetchEvents()
            .then(response => {
                setTotalCount(response.data.count)
                console.log(response.data.count)
                setEvents(response.data.events)
            })
        window.scroll(0, 0)

    }, [currentPage, oldEvents])

    return (
        <div className={styles.EventsWithPagination}>
            <Events events={events} />
            <Pagination totalCount={totalCount} visibleCount={EVENTS_COUNT} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div >
    )
}

export default EventsWithPagination