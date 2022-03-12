import styles from './AdminAddActivitiesPage.module.scss'
import { useEffect, useState } from "react"
import AdminEditPageHeader, { AEPHTypes } from "../../../../components/AdminEditPageHeader/AdminEditPageHeader"
import AddActivityMainInfo, { ActivityMainInfo } from "./AddActivityMainInfo/AddActivityMainInfo"
import {Activity, ActivityAction, emptyActivity} from "../../../../types/activity"
import cn from "classnames"
import AdminSliderCreator from "../../../../components/Admin/AdminSliderCreator/AdminSliderCreator"
import AddActivityScheduleAndSupervisor, { ActivitySupervisorAndSchedule } from './AddActivityScheduleAndSupervisor/AddActivityScheduleAndSupervisor'
import {AxiosResponse} from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useActions } from '../../../../hooks/useActions'
import {Dispatch} from "redux"
import ActivitiesSteps from "../../../../components/Activities/ActivitiesSteps/ActivitiesSteps"

export enum FormPages {
    main = '-MainPage',
    supAndSchedule = '-supAndSchedule',
    achievemnets = '-Achievements'
}

const AdminAddActivitiesPage = () => {
    const { id: activityId } = useParams()
    const { activities, error } = useTypedSelector(state => state.activity)
    const { fetchActivityDetail, addActivity, updateActivity, deleteActivity } = useActions()
    const [activity, setActivity] = useState<Activity>(emptyActivity)
    const [currentPage, setCurrentPage] = useState<FormPages>(FormPages.main)
    const navigate = useNavigate()
    const [errorText, setErrorText] = useState<string>('')

    // Получаем айдишник кружка и если он существует - фетчим его данные
    useEffect(() => {
        if (activityId) {
            fetchActivityDetail(activityId)
        }
    }, [])

    // Если есть айдишник кружка и его данные подгрузились - устанавливаем их в стейт
    useEffect(() => {
        if (activities[0] && activityId) {
            setActivity(activities[0])
        }
    }, [activities[0]])

    const handleFormSubmit = async (achievements: File[]) => {
        const formData = await createFormData(achievements)

        let response: (dispatch: Dispatch<ActivityAction>) => Promise<AxiosResponse | undefined>
        if (activityId) {
            response = await updateActivity(activityId, formData)
        } else {
            response = await addActivity(formData)
        }

        // @ts-ignore
        if (response && response.status === 201) {
            navigate('/admin/activities')
        }
    }

    useEffect(() => {
        if (error) {
            setErrorText(error)
        }
    }, [error])

    const createFormData = async (achievements: File[]) => {
        const formData = new FormData()

        for (const block of activity.content) {
            if (block.type === 'image') {
                if (block.data.file.source) {
                    formData.append('contentImages', block.data.file.source, block.id + '.jpg')
                } else {
                    const file = await fetch(block.data.file.url).then(r => r.blob())
                    formData.append('contentImages', file, block.id + '.jpg')
                }
            }
        }

        // @ts-ignore
        formData.append('content', JSON.stringify(activity.content))
        formData.append('name', activity.name)
        formData.append('previewText', activity.previewText)
        formData.append('supervisor', JSON.stringify(activity.supervisor))

        if (activity.logo instanceof Blob) {
            formData.append('logo', activity.logo)
        }

        if (activity.supervisorPhoto instanceof Blob) {
            formData.append('supervisorPhoto', activity.supervisorPhoto)
        }

        if (achievements.length > 0) {
            achievements.forEach(achievement => {
                formData.append('achievements', achievement)
            })
        } else {
            formData.append('achievementsDelete', 'true')
        }

        activity.schedule.forEach(item => {
            formData.append('schedule', JSON.stringify(item))
        })

        return formData
    }

    const handleSectionSubmit = async (nextSectionName: FormPages,
        mainInfo?: ActivityMainInfo,
        supervisorAndSchedule?: ActivitySupervisorAndSchedule) => {
        setActivity(prevState => {
            if (supervisorAndSchedule) {
                prevState = { ...prevState, ...supervisorAndSchedule }
                prevState.supervisor = { ...supervisorAndSchedule.supervisor }
                prevState.supervisorPhoto = supervisorAndSchedule.supervisor.photo
                prevState.schedule = [...supervisorAndSchedule.schedule]
            }
            else if (mainInfo) {
                prevState = { ...prevState, ...mainInfo }
                prevState.content = mainInfo.content
            }
            return prevState
        })
        setCurrentPage(nextSectionName)
    }

    // Передается в секции формы
    const handleBackBtnClick = (currPage: FormPages) => {
        setCurrentPage(currPage)
    }

    const handleDeleteClick = async () => {
        if (activityId) {
            await deleteActivity(activityId)
            navigate('/admin/activities')
        }
    }

    return (
        <>
            <AdminEditPageHeader
                linkTo='/admin/activities'
                headerForObj={activityId}
                headerFor={AEPHTypes.activity}
                onDeleteBtnClick={handleDeleteClick}
            />
            <ActivitiesSteps currentPage={currentPage} />
            <form className={styles.AddActivityForm}>
                <p className={cn('admin-add-form__error', styles.Error, { [styles['Error-active']]: errorText })}>{errorText}</p>
                {{
                    '-MainPage':
                        <AddActivityMainInfo
                            handleSectionSubmit={handleSectionSubmit}
                            defaultValues={{
                                name: activity.name,
                                previewText: activity.previewText,
                                logo: activity.logo,
                                content: activity.content
                            }}
                        />,
                    '-supAndSchedule':
                        <AddActivityScheduleAndSupervisor
                            handleNavigation={handleBackBtnClick}
                            handleSectionSubmit={handleSectionSubmit}
                            defaultValues={{ supervisor: activity.supervisor, schedule: activity.schedule }}
                        />,
                    '-Achievements':
                        <AdminSliderCreator
                            handleNavigation={handleBackBtnClick}
                            handleSubmit={handleFormSubmit}
                            defaultAchievements={activity.achievements}
                        />,
                }[currentPage]}
            </form>
        </>
    )
}

export default AdminAddActivitiesPage