import React, {FC} from 'react'
import cn from "classnames"
import styles from "./ActivitiesSteps.module.scss"
import circle1 from "../../../assets/img/ActivitiesForm/1.svg"
import line from "../../../assets/img/ActivitiesForm/line.svg"
import circle2 from "../../../assets/img/ActivitiesForm/2.svg"
import circle3 from "../../../assets/img/ActivitiesForm/3.svg"

interface ActivitiesSteps {
    currentPage: string
}

const ActivitiesSteps: FC<ActivitiesSteps> = ({ currentPage }) => {
    return (
        <div className={cn(styles.FormNavigation, styles[`FormNavigation${currentPage}`])}>
            <div className={styles.FormNavigation__Block} id={styles.FormNavigation__MainInfo}>
                <div className={styles.FormNavigation__Block__Title}>
                    <img src={circle1} alt="" />
                    <span className={styles.FormNavigation__Text}>Основная информация</span>
                </div>
                <img src={line} className={styles.FormNavigation__Line} alt="" />
            </div>
            <div className={styles.FormNavigation__Block} id={styles.FormNavigation__supAndSchedule}>
                <div className={styles.FormNavigation__Block__Title}>
                    <img src={circle2} alt="" />
                    <span className={styles.FormNavigation__Text}>Руководитель и расписание</span>
                </div>
                <img src={line} className={styles.FormNavigation__Line} alt="" />
            </div>
            <div className={styles.FormNavigation__Block} id={styles.FormNavigation__Achievements}>
                <div className={styles.FormNavigation__Block__Title}>
                    <img src={circle3} alt="" />
                    <span className={styles.FormNavigation__Text}>Достижения</span>
                </div>
            </div>
        </div>
    )
}

export default ActivitiesSteps