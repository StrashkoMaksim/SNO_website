import React, {FC, useEffect, useState} from 'react'
import plusIcon from "../../../assets/img/plus.svg"
import SupervisorModal from "../../../components/SupervisorModal/SupervisorModal"
import DefaultButton, {ButtonStyles, ButtonTypes} from "../../../components/DefaultButton/DefaultButton"
import {useTypedSelector} from "../../../hooks/useTypedSelector"
import SupervisorsList from "../../../components/SupervisorsList/SupervisorsList"
import {useActions} from "../../../hooks/useActions"
import {Supervisor} from "../../../types/supervisor"

const AdminCouncilPage: FC = () => {
    const { supervisors, loading, error } = useTypedSelector(state => state.supervisor)
    const { fetchCouncil, addCouncilMember, updateCouncilMember, deleteCouncilMember } = useActions()
    const [currentSupervisor, setCurrentSupervisor] = useState<Supervisor>()
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

    useEffect(() => {
        fetchCouncil()
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
                <h1 className="adminH1">Совет СНО</h1>
                <div className="btns">
                    <DefaultButton
                        text={'Добавить члена совета'}
                        imgSrc={plusIcon}
                        style={ButtonStyles.adminFilled}
                        type={ButtonTypes.button}
                        onClick={onOpenModalHandler}
                    />
                </div>
            </header>
            <SupervisorsList supervisors={supervisors} onClick={editSupervisorHandle} />
            {isModalVisible &&
                <SupervisorModal
                    isVisible={isModalVisible}
                    onClose={onCloseModalHandler}
                    supervisor={currentSupervisor}
                    onAdd={addCouncilMember}
                    onUpdate={updateCouncilMember}
                    onDelete={deleteCouncilMember}
                />
            }
        </>
    )
}

export default AdminCouncilPage