import styles from './AdminAddActivitiesPage.module.scss'
import { FormEvent, useEffect, useState } from "react";
import AdminEditPageHeader, { AEPHTypes } from "../../../../components/AdminEditPageHeader/AdminEditPageHeader";
import AddActivityMainInfo, { ActivityMainInfo, emptyActivityMainInfo } from "./AddActivityMainInfo/AddActivityMainInfo";
import { Activity, emptyActivity } from "../../../../types/activity";
import circle1 from '../../../../assets/img/ActivitiesForm/1.svg'
import circle2 from '../../../../assets/img/ActivitiesForm/2.svg'
import circle3 from '../../../../assets/img/ActivitiesForm/3.svg'
import line from '../../../../assets/img/ActivitiesForm/line.svg'
import cn from "classnames";
import AdminSliderCreator, { Achievements } from "../../../../components/Admin/AdminSliderCreator/AdminSliderCreator";
import AddActivityScheduleAndSupervisor, { ActivitySupervisorAndSchedule } from './AddActivityScheduleAndSupervisor/AddActivityScheduleAndSupervisor';


export enum FormPages {
    main = '-MainPage',
    supAndSchedule = '-supAndSchedule',
    achievemnets = '-Achievements'
}

const AdminAddActivitiesPage = () => {

    const activityId = undefined;
    const [activity, setActivity] = useState<Activity>(emptyActivity)
    const [currentPage, setCurrentPage] = useState<FormPages>(FormPages.main)
    const [formFilled, setFormFilled] = useState<boolean>(false);

    const handleFormSubmit = async () => {
        setFormFilled(true)
    }

    useEffect(() => {
        if (formFilled) console.log(activity)
    }, [activity, formFilled])

    const handleSectionSubmit = async (nextSectionName: FormPages,
        mainInfo?: ActivityMainInfo,
        supervisorAndSchedule?: ActivitySupervisorAndSchedule,
        achievements?: Achievements) => {
        setActivity(prevState => {
            if (supervisorAndSchedule) {
                prevState = { ...prevState, ...supervisorAndSchedule }
                prevState.supervisor = { ...supervisorAndSchedule.supervisor }
                prevState.schedule = { ...supervisorAndSchedule.schedule }
            }
            else if (achievements) {
                prevState = { ...prevState, ...achievements }
                prevState.achievements = [...achievements.achievements]
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

    const handleNavigation = (currPage: FormPages) => {
        return (e: any) => setCurrentPage(currPage)
    }

    return (
        <>

            <AdminEditPageHeader
                linkTo='/admin/activities'
                headerForObj={activityId}
                headerFor={AEPHTypes.activity}
                onDeleteBtnClick={() => { }} />

            <div className={cn(styles.FormNavigation, styles[`FormNavigation${currentPage}`])}>
                <div className={styles.FormNavigation__Block}
                    id={styles.FormNavigation__MainInfo}
                    onClick={handleNavigation(FormPages.main)}
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
                    onClick={handleNavigation(FormPages.supAndSchedule)}
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
                    onClick={handleNavigation(FormPages.achievemnets)}
                >
                    <div className={styles.FormNavigation__Block__Title}>
                        <img src={circle3} alt="" />
                        <span className={styles.FormNavigation__Text}>Достижения</span>
                    </div>

                </div>
            </div>

            <form className={cn(styles.AddActivityForm, styles[`AddActivityForm${currentPage}`])}>

                <div className={styles.MainInfo}>
                    <AddActivityMainInfo
                        handleSectionSubmit={handleSectionSubmit} />
                </div>

                <div className={styles.supAndSchedule}>
                    <AddActivityScheduleAndSupervisor
                        handleNavigation={handleBackBtnClick}
                        handleSectionSubmit={handleSectionSubmit} />
                </div>

                <div className={styles.AchievementsBlock}>
                    <AdminSliderCreator
                        handleNavigation={handleBackBtnClick}
                        handleSectionSubmit={handleSectionSubmit}
                        handleSubmit={handleFormSubmit} />
                </div>

            </form>

        </>
    )
}

export default AdminAddActivitiesPage;