import React, {FC, useState} from 'react'
import MakeModal from "../MakeModal/MakeModal"
import AdminAddSupervisorForm from "../Admin/AdminAddSupervisorForm/AdminAddSupervisorForm"
import {emptySupervisor, Supervisor} from "../../types/supervisor"
import DefaultButton, {ButtonStyles, ButtonTypes} from "../DefaultButton/DefaultButton";
import {useActions} from "../../hooks/useActions";

interface SupervisorModalProps {
    supervisor?: Supervisor
    isVisible: boolean
    onClose: () => void
}

const SupervisorModal: FC<SupervisorModalProps> = ({ supervisor, isVisible, onClose }) => {
    const [currentSupervisor, setCurrentSupervisor] = useState<Supervisor>(supervisor || emptySupervisor)
    const { addSupervisor } = useActions()

    const addSupervisorHandle = (supervisor: Supervisor) => {
        setCurrentSupervisor(supervisor)
    }

    const clickHandler = async () => {
        await addSupervisor(currentSupervisor)
        onClose()
    }

    const buttonText = supervisor ? 'Сохранить' : 'Добавить руководителя'

    return (
        <MakeModal modalOpened={isVisible} closeModal={onClose}>
            <AdminAddSupervisorForm updateSupervisor={addSupervisorHandle} />
            <DefaultButton
                text={buttonText}
                style={ButtonStyles.adminFilled}
                type={ButtonTypes.button}
                onClick={clickHandler}
            />
        </MakeModal>
    )
}

export default SupervisorModal