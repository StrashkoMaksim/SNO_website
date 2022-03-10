import React, { FC } from "react"
import styles from "./SupervisorCard.module.scss"
import locationIcon from "../../assets/img/locationIcon.svg"
import phoneIcon from "../../assets/img/phoneIcon.svg"
import positionIcon from "../../assets/img/positionIcon.svg"
import cn from "classnames"
import InfoLabel from "../InfoLabel/InfoLabel"

interface SupervisorProps {
    _id: string
    lastName: string,
    firstAndMiddleName: string,
    department: string,
    position: string,
    phone: string,
    photo: string
    hasLabel?: boolean
}

const SupervisorCard: FC<SupervisorProps> = ({ _id, lastName, firstAndMiddleName, department, position, phone, photo, hasLabel = false }) => {
    return (
        <div className={styles.Supervisor}>
            {hasLabel ? <InfoLabel text="Руководитель" /> : <></>}
            <img className={styles.Avatar} src={process.env.REACT_APP_SERVER_URL + '/' + photo} alt={`${lastName} ${firstAndMiddleName}`} />
            <div className={styles.Data}>
                <div className={styles.FIO}>
                    <span className={cn('Bold', styles.lastName)}>{lastName}</span>
                    <span className={cn(styles.Regular, styles.midAndFirstName)}>{firstAndMiddleName}</span>
                </div>
                <div className={styles.Data__Block}>
                    <img src={locationIcon} alt="" />
                    <span className='Light'>{department}</span>
                </div>
                <div className={styles.Data__Block}>
                    <img src={positionIcon} alt="" />
                    <span className='Light'>{position}</span>
                </div>
                <div className={styles.Data__Block}>
                    <img src={phoneIcon} alt="" />
                    <span className='Light'>{phone}</span>
                </div>
            </div>
        </div>
    )
}

export default SupervisorCard