import React, {FC, useState} from 'react'
import MakeModal from "../MakeModal/MakeModal"
import AdminAddSupervisorForm from "../Admin/AdminAddSupervisorForm/AdminAddSupervisorForm"
import {emptySupervisor, Supervisor} from "../../types/supervisor"
import DefaultButton, {ButtonStyles, ButtonTypes} from "../DefaultButton/DefaultButton"
import styles from "./SupervisorModal.module.scss"

interface SupervisorModalProps {
    supervisor?: Supervisor
    isVisible: boolean
    onClose: () => void
    onAdd: (supervisor: Supervisor) => void
    onUpdate: (supervisor: Supervisor) => void
    onDelete: (supervisorId: string) => void
}

const SupervisorModal: FC<SupervisorModalProps> = ({ supervisor, isVisible, onClose, onAdd, onUpdate, onDelete }) => {
    const [currentSupervisor, setCurrentSupervisor] = useState<Supervisor>(supervisor || emptySupervisor)

    const addSupervisorHandler = (supervisor: Supervisor) => {
        setCurrentSupervisor(supervisor)
    }

    const saveClickHandler = async () => {
        if (supervisor) {
            await onUpdate(currentSupervisor)
        } else {
            await onAdd(currentSupervisor)
        }
        onClose()
    }

    const deleteClickHandler = async () => {
        await onDelete(currentSupervisor._id)
        onClose()
    }

    const buttonText = supervisor ? 'Сохранить' : 'Добавить'

    return (
        <MakeModal modalOpened={isVisible} closeModal={onClose}>
            <AdminAddSupervisorForm updateSupervisor={addSupervisorHandler} currentSupervisor={supervisor} />
            <div className={styles.btns}>
                <DefaultButton
                    text={buttonText}
                    style={ButtonStyles.adminFilled}
                    type={ButtonTypes.button}
                    onClick={saveClickHandler}
                />
                {supervisor &&
                    <DefaultButton
                        text="Удалить"
                        style={ButtonStyles.delete}
                        type={ButtonTypes.button}
                        onClick={deleteClickHandler}
                    />
                }
            </div>
        </MakeModal>
    )
}

export default SupervisorModal