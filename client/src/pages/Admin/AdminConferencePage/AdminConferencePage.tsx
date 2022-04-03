import styles from "./AdminConferencePage.module.scss"
import http from "../../../assets/http-config";
import { useEffect, useState } from "react"
import DefaultButton, { ButtonStyles, ButtonTypes } from "../../../components/DefaultButton/DefaultButton";
import Conference from "./Conference/Conference";
import { emptyConference, IConference } from "../../../types/conference";
import AddConferenceModal from "./AddConferenceModal/AddConferenceModal";
import ConferenceList from "../../../components/ConferenceList/ConferenceList";


const AdminConferencePage = () => {

    const [conferences, setConferences] = useState<IConference[]>([])
    const [conferencesUpdated, setConferencesUpdated] = useState<boolean>(false)
    const [modalOpened, setModalOpened] = useState<boolean>(false)
    const [visibleConference, setVisibleConference] = useState<IConference>(emptyConference)

    const triggerDataFetch = () => setConferencesUpdated(!conferencesUpdated)

    const toggleModal = () => setModalOpened(!modalOpened)

    useEffect(() => {
        const fetchConferences = async () => {
            const response = await http.get(`/conference/all`)
            return response;
        }
        fetchConferences()
            .then(response => {
                if (response.status === 200) {
                    setConferences([...response.data])
                    setVisibleConference(response.data[0])
                }
            })
    }, [conferencesUpdated])

    const addNewConference = async (conference: IConference) => {
        const fd = new FormData();
        fd.set('description', conference.description)
        fd.set('image', conference.image)
        try {

            await http.post('/conference', fd,
                {
                    headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
                })
                .then(response => {
                    // @ts-ignore
                    if (response && response.status !== 200 && response.status !== 201) {
                        // @ts-ignore
                        alert(response.data.message)
                    }
                    triggerDataFetch();
                })
        } catch (e) {
            console.log(e)
        }

    }

    const onConferenceClick = (conferenceNumber: number) => {
        setVisibleConference(conferences[conferenceNumber])
        window.scroll(0, 0)
    }

    return (
        <>
            <header className="adminHeader">
                <h1 className="adminH1">Студенческие конференции</h1>
                <div className="btns">
                    <DefaultButton
                        text="Добавить конференцию"
                        style={ButtonStyles.adminFilled}
                        type={ButtonTypes.button}
                        onClick={toggleModal}
                        extraClass={styles.addConferenceBtn}
                    />
                </div>
            </header>

            <AddConferenceModal modalOpened={modalOpened} closeModal={toggleModal} onSubmit={addNewConference} />
            {
                visibleConference?._id ?
                    <Conference key={visibleConference?._id} _conference={visibleConference} triggerDataFetch={triggerDataFetch} />
                    : <></>
            }
            {
                conferences.length > 0 ?
                    <ConferenceList
                        conferences={conferences}
                        onConferenceClick={onConferenceClick}
                        isAdmin
                    />
                    : <></>
            }

        </>
    )
}

export default AdminConferencePage