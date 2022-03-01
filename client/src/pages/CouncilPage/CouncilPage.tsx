import React, { FC, useEffect } from 'react';
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import cn from 'classnames';
import styles from "./CouncilPage.module.scss"
import photo from "../../assets/img/zhiltsov.jpg"
import Supervisor from '../../components/Supervisor/Supervisor';

const CouncilPage: FC = () => {
    // const { supervisors, error, loading } = useTypedSelector(state => state.supervisor)
    // const { fetchSupervisors } = useActions()

    // useEffect(() => {
    //     fetchSupervisors()
    // }, [])

    const mockSupervisor = {
        _id: "1",
        fio: "Нежильцов Александр Владимирович",
        department: "Высшая математика",
        position: "доцент",
        phone: "407-439",
        photo: photo
    }
    const mockSupervisors = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    return (
        <section className={'section'}>
            <div className={'container'}>
                <h1>Совет СНО</h1>
                <div className={styles.SupervisorsBlock}>
                    {
                        mockSupervisors.map(supervisor => <Supervisor
                            key={mockSupervisor._id}
                            fio={mockSupervisor.fio}
                            department={mockSupervisor.department}
                            position={mockSupervisor.position}
                            phone={mockSupervisor.phone}
                            photo={mockSupervisor.photo}
                        />)
                    }
                </div>
            </div>
        </section>
    );
};

export default CouncilPage;