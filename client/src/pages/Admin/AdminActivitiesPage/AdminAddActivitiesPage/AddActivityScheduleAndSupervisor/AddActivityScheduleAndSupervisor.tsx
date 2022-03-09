import { FC, useEffect, useState } from "react"
import AdminAddSupervisorForm from "../../../../../components/Admin/AdminAddSupervisorForm/AdminAddSupervisorForm"
import DefaultButton, { ButtonStyles, ButtonTypes } from "../../../../../components/DefaultButton/DefaultButton"
import ErrorMessage from "../../../../../components/ErrorMessage/ErrorMessage"
import { emptySchedule, ScheduleInterface } from "../../../../../types/schedule"
import { emptySupervisor, Supervisor } from "../../../../../types/supervisor"
import { FormPages } from "../AdminAddActivitiesPage"
import SchedulePicker from "../SchedulePicker/SchedulePicker"
import styles from './AddActivityScheduleAndSupervisor.module.scss'

const emptyActivitySAS = {
    supervisor: emptySupervisor,
    schedule: [emptySchedule]
}

export interface ActivitySupervisorAndSchedule {
    supervisor: Supervisor,
    schedule: ScheduleInterface[]
}

interface AASASProps {
    handleNavigation: (currPage: FormPages) => void
    handleSectionSubmit: (nextSectionName: FormPages, m?: undefined, supervisorAndSchedule?: ActivitySupervisorAndSchedule) => void
}

const AddActivityScheduleAndSupervisor: FC<AASASProps> = ({ handleNavigation, handleSectionSubmit }) => {

    const [scheduleAndSupervisor, setScheduleAndSupervisor] = useState<ActivitySupervisorAndSchedule>(emptyActivitySAS)
    const [sectionSubmitted, setSectionSubmitted] = useState<boolean>(false)
    const [errMessage, setErrMessage] = useState<string>('')
    const [changedData, setChangedData] = useState<boolean>(false)

    const [supervisorFilled, setSupervisorFilled] = useState<boolean>(false)
    const [scheduleFilled, setScheduleFilled] = useState<boolean>(false)

    const getActivityAndScheduleData = () => {
        setSectionSubmitted(!sectionSubmitted)
    }

    useEffect(() => {
        if (supervisorFilled && scheduleFilled)
            handleSectionSubmit(FormPages.achievemnets, undefined, scheduleAndSupervisor)
    }, [changedData])

    const updateSupervisor = (supervisor: Supervisor) => {
        for (let key in supervisor) {
            if (!supervisor[key as keyof Supervisor]) {
                raiseSubmitErr('Заполните информацию о руководителе!')
                return;
            }
        }

        setScheduleAndSupervisor(prevState => {
            prevState.supervisor = { ...supervisor }
            return prevState
        })
        setSupervisorFilled(true)
        setChangedData(!changedData)
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
        setScheduleFilled(true)
        setChangedData(!changedData)

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

    return (
        <div className={styles.supAndSchedule}>
            <div className={styles.supAndSchedule__Inputs}>
                <AdminAddSupervisorForm updateSupervisor={updateSupervisor} />
                <SchedulePicker sectionSubmitted={sectionSubmitted} updateSchedule={updateSchedule} />
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
                    onClick={getActivityAndScheduleData}
                />
            </div>
        </div>
    )
}

export default AddActivityScheduleAndSupervisor