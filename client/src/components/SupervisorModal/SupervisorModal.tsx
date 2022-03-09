import React, {FC, useState} from 'react'
import MakeModal from "../MakeModal/MakeModal"
import AdminAddSupervisorForm from "../Admin/AdminAddSupervisorForm/AdminAddSupervisorForm"
import {emptySupervisor, Supervisor} from "../../types/supervisor"
import DefaultButton, {ButtonStyles, ButtonTypes} from "../DefaultButton/DefaultButton"
import {useActions} from "../../hooks/useActions"
import styles from "./SupervisorModal.module.scss"

interface SupervisorModalProps {
    supervisor?: Supervisor
    isVisible: boolean
    onClose: () => void
}

const SupervisorModal: FC<SupervisorModalProps> = ({ supervisor, isVisible, onClose }) => {
    const [currentSupervisor, setCurrentSupervisor] = useState<Supervisor>(supervisor || emptySupervisor)
    const { addSupervisor, updateSupervisor, deleteSupervisor } = useActions()

    const addSupervisorHandle = (supervisor: Supervisor) => {
        setCurrentSupervisor(supervisor)
    }

    const saveClickHandler = async () => {
        if (supervisor) {
            await updateSupervisor(currentSupervisor)
        } else {
            await addSupervisor(currentSupervisor)
        }
        onClose()
    }

    const deleteClickHandler = async () => {
        await deleteSupervisor(currentSupervisor._id)
        onClose()
    }

    const buttonText = supervisor ? 'Сохранить' : 'Добавить руководителя'

    return (
        <MakeModal modalOpened={isVisible} closeModal={onClose}>
            <AdminAddSupervisorForm updateSupervisor={addSupervisorHandle} currentSupervisor={supervisor} />
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