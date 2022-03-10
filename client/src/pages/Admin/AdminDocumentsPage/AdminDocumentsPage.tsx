import React, {FC, useEffect, useState} from 'react'
import plusIcon from "../../../assets/img/plus.svg"
import SupervisorModal from "../../../components/SupervisorModal/SupervisorModal";
import DefaultButton, {ButtonStyles, ButtonTypes} from "../../../components/DefaultButton/DefaultButton";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import SupervisorsList from "../../../components/SupervisorsList/SupervisorsList";
import {useActions} from "../../../hooks/useActions";
import {Supervisor} from "../../../types/supervisor";
import DocumentsSection from "../../../components/DocumentsSection/DocumentsSection";

const AdminDocumentsPage: FC = () => {
    const { supervisors, loading, error } = useTypedSelector(state => state.supervisor)
    const { fetchSupervisors, addSupervisor, updateSupervisor, deleteSupervisor } = useActions()
    const [currentSupervisor, setCurrentSupervisor] = useState<Supervisor>()
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

    useEffect(() => {
        fetchSupervisors()
    }, [])

    const onOpenModalHandler = () => {
        setIsModalVisible(true)
    }

    const onCloseModalHandler = () => {
        setIsModalVisible(false)
    }

    const editSupervisorHandle = (supervisor: Supervisor) => {
        return () => {
            setCurrentSupervisor(supervisor)
            onOpenModalHandler()
        }
    }

    return (
        <>
            <header className="adminHeader">
                <h1 className="adminH1">Документы</h1>
                <div className="btns">
                    <DefaultButton
                        text={'Добавить категорию'}
                        imgSrc={plusIcon}
                        style={ButtonStyles.adminFilled}
                        type={ButtonTypes.button}
                        onClick={onOpenModalHandler}
                    />
                </div>
            </header>
            {/*<DocumentsSection title={'dfgd'} documents={} />*/}
            {isModalVisible &&
                <SupervisorModal
                    isVisible={isModalVisible}
                    onClose={onCloseModalHandler}
                    supervisor={currentSupervisor}
                    onAdd={addSupervisor}
                    onUpdate={updateSupervisor}
                    onDelete={deleteSupervisor}
                />
            }
        </>
    )
}

export default AdminDocumentsPage