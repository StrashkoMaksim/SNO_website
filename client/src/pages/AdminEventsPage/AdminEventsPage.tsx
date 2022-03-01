import styles from "./AdminEventsPage.module.scss"
import cn from "classnames";
import addIcon from "../../assets/img/addIcon.svg"
import React, { useEffect } from "react";
import http from "../../assets/http-config";
import AddEventModal, { RequestType, eventData } from "./AddEventModal";
import Events from "../EventsPage/Events";

const AdminEventsPage = () => {

    const defaultFormData = {
        id: "",
        name: "",
        date: null,
        organizerText: "",
        organizerLink: "",
    }

    const [events, setEvents] = React.useState<any[]>([]);
    const [eventsUpdated, setEventsUpdated] = React.useState<boolean>(false)

    const updateEvents = () => setEventsUpdated(!eventsUpdated)


    const [modalForm_Data, setModalForm_Data] = React.useState<eventData>(defaultFormData)
    const [modalForm_ReqType, setModalForm_ReqType] = React.useState<RequestType>(RequestType.post)
    const [modalOpened, setModalOpened] = React.useState<boolean>(false);

    const openModalForm = (eventData?: eventData, reqType?: RequestType) => {
        console.log(eventData)
        if (eventData) setModalForm_Data(eventData)
        if (reqType) setModalForm_ReqType(reqType)
        setModalOpened(true)
    }
    const closeModalForm = () => {
        setModalForm_Data(defaultFormData)
        setModalOpened(false)
    }

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
    }, [eventsUpdated])


    return (
        <>
            <AddEventModal
                modalOpened={modalOpened}
                closeModal={closeModalForm}
                requestType={modalForm_ReqType}
                eventData={modalForm_Data}
                updateEvents={updateEvents} />

            <div className={styles.Container}>
                <div className={styles.Title}>
                    <h2>Изменить мероприятия</h2>
                    <button className={cn(styles.addEventBtn)} onClick={() => openModalForm(defaultFormData, RequestType.post)}>
                        <img src={addIcon} alt="" />
                    </button>
                </div>

                <Events events={events} admin={true} openModalForm={openModalForm} />
            </div>
        </>
    )
}

export default AdminEventsPage;