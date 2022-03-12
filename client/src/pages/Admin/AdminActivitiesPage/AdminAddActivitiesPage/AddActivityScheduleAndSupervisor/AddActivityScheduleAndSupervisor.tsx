import { FC, useEffect, useState } from "react"
import AdminAddSupervisorForm from "../../../../../components/Admin/AdminAddSupervisorForm/AdminAddSupervisorForm"
import DefaultButton, { ButtonStyles, ButtonTypes } from "../../../../../components/DefaultButton/DefaultButton"
import ErrorMessage from "../../../../../components/ErrorMessage/ErrorMessage"
import { emptySchedule, ScheduleInterface } from "../../../../../types/schedule"
import { AddSupervisor, emptySupervisor, Supervisor } from "../../../../../types/supervisor"
import { FormPages } from "../AdminAddActivitiesPage"
import SchedulePicker from "../SchedulePicker/SchedulePicker"
import styles from './AddActivityScheduleAndSupervisor.module.scss'

const emptyActivitySAS = {
    supervisor: emptySupervisor,
    schedule: []
}

export interface ActivitySupervisorAndSchedule {
    supervisor: Supervisor,
    schedule: ScheduleInterface[]
}

interface AASASProps {
    handleNavigation: (currPage: FormPages) => void
    handleSectionSubmit: (nextSectionName: FormPages, m?: undefined, supervisorAndSchedule?: ActivitySupervisorAndSchedule) => void
    defaultValues: ActivitySupervisorAndSchedule
}

const AddActivityScheduleAndSupervisor: FC<AASASProps> = ({ handleNavigation, handleSectionSubmit, defaultValues }) => {
    const [scheduleAndSupervisor, setScheduleAndSupervisor] = useState<ActivitySupervisorAndSchedule>(emptyActivitySAS)
    const [errMessage, setErrMessage] = useState<string>('')
    const [sectionFilled, setSectionFilled] = useState<boolean>(false)

    // Заполняем секцию (только 1 раз)

    useEffect(() => {
        if (!sectionFilled && defaultValues.schedule?.length !== 0 && defaultValues.schedule) {
            setScheduleAndSupervisor(defaultValues)
            setSectionFilled(true)
        }
    }, [defaultValues])

    const updateSupervisor = (supervisor: Supervisor) => {
        setScheduleAndSupervisor(prevState => {
            prevState.supervisor = { ...supervisor, photo: supervisor.photo }
            return prevState
        })
    }

    const updateSchedule = (schedule: ScheduleInterface[]) => {
        if (schedule.length === 0) {
            raiseSubmitErr('Заполните расписание!')
            return;
        }

        setScheduleAndSupervisor(prevState => {
            prevState.schedule = [...schedule]
            return prevState
        })
    }

    const raiseSubmitErr = (errMsg: string) => {
        setErrMessage(errMsg)

        setTimeout(() => {
            setErrMessage('')
        }, 3000)
    }

    const returnToPrevSection = () => {
        handleNavigation(FormPages.main)
    }

    const nextClickHandle = () => {
        if (scheduleAndSupervisor.schedule.length === 0) {
            raiseSubmitErr('Заполните расписание!')
            return;
        }

        for (let key in scheduleAndSupervisor.supervisor) {
            if (!scheduleAndSupervisor.supervisor[key as keyof Supervisor]) {
                raiseSubmitErr('Заполните информацию о руководителе!')
                return;
            }
        }
        handleSectionSubmit(FormPages.achievemnets, undefined, scheduleAndSupervisor)
    }

    return (
        <div className={styles.supAndSchedule}>
            <div className={styles.supAndSchedule__Inputs}>
                <AdminAddSupervisorForm updateSupervisor={updateSupervisor} currentSupervisor={scheduleAndSupervisor.supervisor} />
                <SchedulePicker updateSchedule={updateSchedule} defaultSchedule={scheduleAndSupervisor.schedule} />
            </div>
            <div className={styles.controlButtons}>
                <ErrorMessage errMessage={errMessage} />
                <DefaultButton
                    text="Назад"
                    type={ButtonTypes.button}
                    style={ButtonStyles.adminFilled}
                    extraClass={styles.backButton}
                    onClick={returnToPrevSection}
                />
                <DefaultButton
                    text="Далее"
                    type={ButtonTypes.button}
                    style={ButtonStyles.adminFilled}
                    onClick={nextClickHandle}
                />
            </div>
        </div>
    )
}

export default AddActivityScheduleAndSupervisor