import React, { FC, useEffect } from 'react';
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import MainLayout from '../../components/MainLayout/MainLayout';
import styles from "./SupervisorsPage.module.scss"
import photo from "../../assets/img/zhiltsov.jpg"
import Supervisor from '../../components/Supervisor/Supervisor';

const SupervisorsPage: FC = () => {
    // const { supervisors, error, loading } = useTypedSelector(state => state.supervisor)
    // const { fetchSupervisors } = useActions()

    // useEffect(() => {
    //     fetchSupervisors()
    // }, [])

    const mockSupervisor = {
        _id: "1",
        fio: "Жильцов Александр Владимирович",
        department: "Высшая математика",
        position: "доцент",
        phone: "407-439",
        photo: photo
    }
    const mockSupervisors = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    return (

        <MainLayout>
            <section className={'section'}>
                <div className={'container'}>
                    <h1>Руководители</h1>
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
        </MainLayout >
    );
};

export default SupervisorsPage;