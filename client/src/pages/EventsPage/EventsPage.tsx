import MainLayout from "../../components/MainLayout/MainLayout";
import styles from "./EventsPage.module.scss"
import cn from "classnames";
import Event from "../../components/Event/Event";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import addIcon from "../../assets/img/addIcon.svg"
import React from "react";
import AddEventModal, { RequestType } from "./AddEventModal";

const EventsPage = () => {

    const isAuth = useTypedSelector(state => state.user.isAuth)

    const [modalOpened, setModalOpened] = React.useState<boolean>(false);
    const openModalForm = () => setModalOpened(true)
    const closeModalForm = () => setModalOpened(false)

    const mockEvents = {
        _id: '1',
        name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do sed do sed do sed do sed do sed do sed do sed do.',
        date: '22/12/2022',
        organizerText: 'Дальневосточный государственный университет путей сообщения',
        organizerLink: 'https://dvgups.ru/'
    }
    const mockEventsArr = [0, 0, 0, 0, 0, 0, 0]

    return (
        <MainLayout>
            <AddEventModal modalOpened={modalOpened} closeModal={closeModalForm} requestType={RequestType.post} />
            <section className={cn('section')}>
                <div className={cn('container')}>
                    <h1>Ближайшие мероприятия</h1>
                    <div className={styles.Events}>

                        <button className={cn(styles.addEventBtn, { [styles['addEventBtn-active']]: isAuth })} onClick={openModalForm}>
                            <img src={addIcon} alt="" />
                        </button>

                        <div className={cn(styles.tableTitles, { [styles['tableTitles-admin']]: isAuth })}>
                            <span>Название</span>
                            <span>Дата</span>
                            <span>Организатор</span>
                        </div>
                        {mockEventsArr.map(event => <Event
                            key={mockEvents._id}
                            name={mockEvents.name}
                            date={mockEvents.date}
                            organizerText={mockEvents.organizerText}
                            organizerLink={mockEvents.organizerLink}
                            isAuth={isAuth} />)}
                    </div>
                </div>
            </section>
        </MainLayout >
    )
}

export default EventsPage;