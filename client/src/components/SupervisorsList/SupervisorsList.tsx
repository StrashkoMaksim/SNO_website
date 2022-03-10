import React, {FC} from 'react'
import styles from "../../pages/User/SupervisorsPage/SupervisorsPage.module.scss"
import SupervisorCard from "../SupervisorCard/SupervisorCard";
import {Supervisor} from "../../types/supervisor";

interface SupervisorsListProps {
    supervisors: Supervisor[]
    onClick?: (supervisor: Supervisor) => () => void
}

const SupervisorsList: FC<SupervisorsListProps> = ({ supervisors, onClick }) => {
    return (
        <div className={styles.SupervisorsBlock}>
            {supervisors.length > 0 ?
                supervisors.map(supervisor =>
                    <SupervisorCard
                        key={supervisor._id}
                        _id={supervisor._id}
                        lastName={supervisor.lastName}
                        firstAndMiddleName={supervisor.firstAndMiddleName}
                        department={supervisor.department}
                        position={supervisor.position}
                        phone={supervisor.phone}
                        photo={supervisor.photo}
                        onClick={onClick ? onClick(supervisor) : undefined}
                    />
                )
                :
                <p>Руководители отсутствуют</p>
            }
        </div>
    )
}

export default SupervisorsList