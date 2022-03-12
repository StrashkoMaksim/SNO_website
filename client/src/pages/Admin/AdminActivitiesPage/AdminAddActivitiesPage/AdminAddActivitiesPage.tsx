import styles from './AdminAddActivitiesPage.module.scss'
import { useEffect, useLayoutEffect, useState } from "react";
import AdminEditPageHeader, { AEPHTypes } from "../../../../components/AdminEditPageHeader/AdminEditPageHeader";
import AddActivityMainInfo, { ActivityMainInfo } from "./AddActivityMainInfo/AddActivityMainInfo";
import { Activity, emptyActivity } from "../../../../types/activity";
import circle1 from '../../../../assets/img/ActivitiesForm/1.svg'
import circle2 from '../../../../assets/img/ActivitiesForm/2.svg'
import circle3 from '../../../../assets/img/ActivitiesForm/3.svg'
import line from '../../../../assets/img/ActivitiesForm/line.svg'
import cn from "classnames";
import AdminSliderCreator from "../../../../components/Admin/AdminSliderCreator/AdminSliderCreator";
import AddActivityScheduleAndSupervisor, { ActivitySupervisorAndSchedule } from './AddActivityScheduleAndSupervisor/AddActivityScheduleAndSupervisor';
import axios, { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useActions } from '../../../../hooks/useActions';

export enum FormPages {
    main = '-MainPage',
    supAndSchedule = '-supAndSchedule',
    achievemnets = '-Achievements'
}

const AdminAddActivitiesPage = () => {

    const { id: activityId } = useParams()
    const { activities } = useTypedSelector(state => state.activity)
    const { fetchActivityDetail } = useActions()

    const [activity, setActivity] = useState<Activity>(emptyActivity)
    const [currentPage, setCurrentPage] = useState<FormPages>(FormPages.main)
    const navigate = useNavigate()

    const [errorText, setErrorText] = useState<string>('')

    // Получаем айдишник кружка и если он существует
    // фетчим его данные 

    useEffect(() => {
        if (activityId) {
            fetchActivityDetail(activityId)
        }
        window.scrollTo(0, 0)
    }, [])

    // Если есть айдишник кружка
    // и его данные подгрузились - устанавливаем их в стейт

    useEffect(() => {
        if (activities[0] && activityId) {
            setActivity(activities[0])
        }
    }, [activities[0]])

    const handleFormSubmit = async (achievements: File[]) => {
        try {
            if (activityId) {
                await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/section/${activityId}`, await createFormData(achievements), {
                    headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
                })
            } else {
                await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/section`, await createFormData(achievements), {
                    headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
                })
            }
            navigate('/admin/activities')
        } catch (e) {
            const error = e as Error | AxiosError;
            if (axios.isAxiosError(error)) {
                setErrorText('Ошибка! ' + error?.response?.data?.errors[0]?.msg)
                console.log(error?.response?.data?.errors)
                setTimeout(() => setErrorText(''), 3000)
            }
        }

    }

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
        formData.append('logo', activity.logo)
        formData.append('supervisor', JSON.stringify(activity.supervisor))
        formData.append('supervisorPhoto', activity.supervisorPhoto)

        achievements.forEach(achievement => {
            formData.append('achievements', achievement)
        })

        activity.schedule.forEach(item => {
            formData.append('schedule', JSON.stringify(item))
        })

        // @ts-ignore
        for (var pair of formData.entries()) {
            console.log(pair[0])
            console.log(pair[1])
        }

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

    return (
        <>
            <AdminEditPageHeader
                linkTo='/admin/activities'
                headerForObj={activityId}
                headerFor={AEPHTypes.activity}
                onDeleteBtnClick={() => { }}
            />
            <div className={cn(styles.FormNavigation, styles[`FormNavigation${currentPage}`])}>
                <div className={styles.FormNavigation__Block}
                    id={styles.FormNavigation__MainInfo}
                >
                    <div className={styles.FormNavigation__Block__Title}>
                        <img src={circle1} alt="" />
                        <span className={styles.FormNavigation__Text}>Основная информация</span>
                    </div>

                    <img src={line} className={styles.FormNavigation__Line} alt="" />
                </div>

                <div
                    className={styles.FormNavigation__Block}
                    id={styles.FormNavigation__supAndSchedule}
                >
                    <div className={styles.FormNavigation__Block__Title}>
                        <img src={circle2} alt="" />
                        <span className={styles.FormNavigation__Text}>Руководитель и расписание</span>
                    </div>

                    <img src={line} className={styles.FormNavigation__Line} alt="" />
                </div>
                <div
                    className={styles.FormNavigation__Block}
                    id={styles.FormNavigation__Achievements}
                >
                    <div className={styles.FormNavigation__Block__Title}>
                        <img src={circle3} alt="" />
                        <span className={styles.FormNavigation__Text}>Достижения</span>
                    </div>

                </div>
            </div>

            <form className={cn(styles.AddActivityForm, styles[`AddActivityForm${currentPage}`])}>
                <p className={cn('admin-add-form__error', styles.Error, { [styles['Error-active']]: errorText })}>{errorText}</p>
                <div className={styles.MainInfo}>
                    <AddActivityMainInfo
                        handleSectionSubmit={handleSectionSubmit}
                        defaultValues={{
                            name: activity.name,
                            previewText: activity.previewText,
                            logo: activity.logo,
                            content: activity.content
                        }}
                    />
                </div>

                <div className={styles.supAndSchedule}>
                    <AddActivityScheduleAndSupervisor
                        handleNavigation={handleBackBtnClick}
                        handleSectionSubmit={handleSectionSubmit}
                        defaultValues={{ supervisor: activity.supervisor, schedule: activity.schedule }}
                    />
                </div>

                <div className={styles.AchievementsBlock}>
                    <AdminSliderCreator
                        handleNavigation={handleBackBtnClick}
                        handleSubmit={handleFormSubmit}
                        defaultAchievements={activity.achievements}
                    />
                </div>

            </form>

        </>
    )
}

export default AdminAddActivitiesPage;