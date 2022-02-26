import React, { FC } from "react"
import styles from "./Supervisor.module.scss"
import locationIcon from "../../assets/img/locationIcon.svg"
import phoneIcon from "../../assets/img/phoneIcon.svg"
import positionIcon from "../../assets/img/positionIcon.svg"
import cn from "classnames"
interface SupervisorProps {
    fio: string,
    department: string,
    position: string,
    phone: string,
    photo: string
}

const Supervisor: FC<SupervisorProps> = ({ fio, department, position, phone, photo }) => {

    const fioSplit = fio.split(' ');
    const FIO = {
        lastName: fioSplit.splice(0, 1),
        firstAndMiddleName: fioSplit.join(" ")
    }

    return (
        <div className={styles.Supervisor}>
            <img className={styles.Avatar} src={photo} alt="Supervisor image" />
            <div className={styles.Data}>
                <div className={styles.FIO}>
                    <span className={cn(styles.Bold, styles.lastName)}>{FIO.lastName}</span>
                    <span className={cn(styles.Regular, styles.midAndFirstName)}>{FIO.firstAndMiddleName}</span>
                </div>
                <div className={styles.Data__Block}>
                    <img src={locationIcon} alt="" />
                    <span className={styles.Light}>{department}</span>
                </div>
                <div className={styles.Data__Block}>
                    <img src={positionIcon} alt="" />
                    <span className={styles.Light}>{position}</span>
                </div>
                <div className={styles.Data__Block}>
                    <img src={phoneIcon} alt="" />
                    <span className={styles.Light}>{phone}</span>
                </div>
            </div>
        </div>
    )
}

export default Supervisor;