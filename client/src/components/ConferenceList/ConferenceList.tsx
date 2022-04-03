import { FC, useState } from "react"
import { IConference } from "../../types/conference"
import DefaultButton, { ButtonStyles, ButtonTypes } from "../DefaultButton/DefaultButton"
import styles from './ConferenceList.module.scss'
import cn from 'classnames'
import openIcon from '../../assets/img/openIcon.svg'

interface ConferenceListProps {
    conferences: IConference[]
    onConferenceClick: (conferenceNumber: number) => void
    isAdmin?: boolean
}

const ConferenceList: FC<ConferenceListProps> = ({ conferences, onConferenceClick, isAdmin = true }) => {
    const [listVisible, setListVisible] = useState<boolean>(false)

    const toggleConferencesList = () => setListVisible(!listVisible)

    const openConference = (index: number) => {
        return (e: any) => onConferenceClick(index)
    }

    return (
        <div className={styles.conferenceList}>
            <div className={cn(styles.conferenceList__list, { [styles['conferenceList__list-active']]: listVisible })}>
                {conferences.map((conf, index) =>
                    <div key={conf._id} className={styles.conferenceList__listItem}>
                        <img src={`${process.env.REACT_APP_SERVER_URL}/${conf.image}`} alt="" />
                        <p className={styles.description}>{conf.description}</p>
                        <button
                            className={styles.openConferenceBtn}
                            onClick={openConference(index)}
                        >
                            <span>{isAdmin ? 'Редактировать' : 'Открыть'}</span>
                            <img src={openIcon} alt="" />
                        </button>
                    </div>
                )}
            </div>

            <DefaultButton
                text={listVisible ? 'Скрыть' : 'Показать все конференции'}
                onClick={toggleConferencesList}
                style={ButtonStyles.filled}
                type={ButtonTypes.button}
            />
        </div >
    )
}

export default ConferenceList