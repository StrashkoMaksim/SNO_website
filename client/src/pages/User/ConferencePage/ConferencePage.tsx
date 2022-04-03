import DocumentsSection from "../../../components/DocumentsSection/DocumentsSection";
import styles from "./ConferencePage.module.scss"
import { useEffect, useState } from "react";
import http from "../../../assets/http-config";
import { emptyConference, IConference } from "../../../types/conference";
import DefaultButton, { ButtonStyles, ButtonTypes } from "../../../components/DefaultButton/DefaultButton";
import ConferenceList from "../../../components/ConferenceList/ConferenceList";

const ConferencePage = () => {

    const [conferences, setConferences] = useState<IConference[]>([])
    const [visibleConference, setVisibleConference] = useState<IConference>(emptyConference)

    useEffect(() => {
        const fetchConferences = async () => {
            const response = await http.get(`/conference/all`)
            return response;
        }

        fetchConferences()
            .then(response => {
                if (response.status === 200) {
                    setConferences(response.data)
                    setVisibleConference(response.data[0])
                }
            })
    }, [])

    useEffect(() => window.scroll(0, 0), [])

    const onConferenceClick = (conferenceNumber: number) => {
        setVisibleConference(conferences[conferenceNumber])
        window.scroll(0, 0)
    }

    return (
        <section className={'section'}>
            <div className={'container'}>
                <h1>Студенческая конференция</h1>

                <section className={styles.Conference}>
                    <img className={styles.Conference__Banner} src={`${process.env.REACT_APP_SERVER_URL}/${visibleConference?.image}`} alt="Conference baner" />
                    <div className={styles.Conference__Content}>
                        <p>{visibleConference?.description} </p>
                    </div>
                </section>

                <DocumentsSection title="Документы" documents={visibleConference?.documents} />

                <ConferenceList
                    conferences={conferences}
                    onConferenceClick={onConferenceClick}
                    isAdmin={false}
                />

            </div>
        </section>
    )
}

export default ConferencePage;