import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import styles from './ActivityFull.module.scss'
import cn from 'classnames'
import SupervisorCard from '../../SupervisorCard/SupervisorCard'
import Schedule from '../../Schedule/Schedule'
import ParsedEditor from '../../ParsedEditor/ParsedEditor'
import CustomSlider from '../../CustomSlider/CustomSlider'

const ActivityFull = () => {
    const { id: activityId } = useParams()
    const { activities } = useTypedSelector(state => state.activity)
    const { fetchActivityDetail } = useActions()

    useEffect(() => {
        if (activityId) fetchActivityDetail(activityId)
        window.scrollTo(0, 0)
        console.log(activities[0])
    }, [])

    return (
        <>
            <section className={'section'}>
                <div className={cn('container', styles.Activity)}>
                    <section className={styles.Activity__MainInfo}>
                        <div className={styles.Activity__MainInfo__Head}>
                            <div className={styles.Activity__MainInfo__Head__Text}>
                                <p className={styles.Name}>{activities[0]?.name}</p>

                                <p className={styles.previewText}>{activities[0]?.previewText}</p>
                            </div>

                            <img className={styles.logo} src={`${process.env.REACT_APP_SERVER_URL}/${activities[0]?.logo}`} />
                        </div>

                        <ParsedEditor content={activities[0]?.content} />

                    </section>
                    <aside className={styles.Activity__ScheduleAndSupervisor}>
                        <SupervisorCard
                            _id={activities[0]?.supervisor?._id}
                            lastName={activities[0]?.supervisor?.lastName}
                            firstAndMiddleName={activities[0]?.supervisor?.firstAndMiddleName}
                            department={activities[0]?.supervisor?.department}
                            position={activities[0]?.supervisor?.position}
                            phone={activities[0]?.supervisor?.phone}
                            photo={activities[0]?.supervisor?.photo}
                            hasLabel
                        />
                        <Schedule schedule={activities[0]?.schedule} />
                    </aside>

                </div>
            </section >
            {activities[0]?.achievements ? <CustomSlider slides={activities[0]?.achievements} title='Достижения' /> : <></>}
        </>
    )
}

export default ActivityFull