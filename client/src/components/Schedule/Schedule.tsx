import styles from './Schedule.module.scss'
import { ScheduleInterface, WeekType } from '../../types/schedule'
import { FC } from 'react'
import calendarIcon from '../../assets/img/calendarIcon.svg'
import timeIcon from '../../assets/img/timeIcon.svg'
import classroomIcon from '../../assets/img/classroomIcon.svg'
import numerator from '../../assets/img/numerator.svg'
import denominator from '../../assets/img/denominator.svg'
import numeratorAnddenominator from '../../assets/img/numerator&denominator.svg'
import InfoLabel from '../InfoLabel/InfoLabel'
import cn from 'classnames'

interface ScheduleProps {
    schedule: ScheduleInterface[]
}

const Schedule: FC<ScheduleProps> = ({ schedule }) => {
    return (
        <div className={styles.schedule} >
            <InfoLabel text='Расписание' />
            {schedule ? schedule.map((element, index) =>
                <div
                    className={styles.schedule__single}
                    key={index}
                >
                    <div className={styles.schedule__single__field}>
                        <div className={styles.imgContainer}>
                            <img src={calendarIcon} alt=""></img>
                        </div>
                        <span className={styles.text}>{element.day}</span>
                        <img
                            src={
                                element.week === WeekType.numerator ?
                                    numerator : element.week === WeekType.denominator ?
                                        denominator : numeratorAnddenominator}
                            title={element.week === WeekType.numerator ?
                                'Числитель' : element.week === WeekType.denominator ?
                                    'Знаменатель' : 'Каждая неделя'}
                            alt=""
                        />
                    </div>
                    <div className={styles.schedule__single__field}>
                        <div className={styles.imgContainer}>
                            <img src={timeIcon} alt=""></img>
                        </div>
                        <span className={styles.text}>{element.time}</span>
                    </div>
                    <div className={styles.schedule__single__field}>
                        <div className={styles.imgContainer}>
                            <img src={classroomIcon} alt=""></img>
                        </div>
                        <span className={cn(styles.text, styles.classroom)}>{element.classroom}</span>
                    </div>
                </div>
            ) : <></>}
            <div
                className={styles.schedule__single}
                id={styles.iconTip}
            >
                <div className={styles.schedule__single__field}>
                    <div className={styles.imgContainer}>
                        <img src={numerator} alt=""></img>
                    </div>
                    <span className={styles.text}>числитель</span>
                </div>
                <div className={styles.schedule__single__field}>
                    <div className={styles.imgContainer}>
                        <img src={denominator} alt=""></img>
                    </div>
                    <span className={styles.text}>знаменатель</span>
                </div>
                <div className={styles.schedule__single__field}>
                    <div className={styles.imgContainer}>
                        <img src={numeratorAnddenominator} alt=""></img>
                    </div>
                    <span className={styles.text}>каждая неделя</span>
                </div>
            </div>
        </div>
    )
}

export default Schedule;