import styles from './ActivitiesBlock.module.scss'
import React, { useState, useEffect } from 'react'
import http from '../../../assets/http-config';
import cn from 'classnames';
import arrowSVG from "../../../assets/img/arrow.svg"
import ActivityList from "../ActivityList/ActivityList";

const ActivitiesBlock = () => {
    const [activities, setActivities] = useState<any[]>([]);
    const [activitiesExpanded, setActivitiesExpanded] = useState<boolean>(false);

    useEffect(() => {

        // Изначально обрезаем до 8 кружков
        // fetchActivites()

        //Пока просто мок-объект
        setActivities([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    }, [])


    const handleExpandActivitiesBtnClick = () => {
        setActivitiesExpanded(!activitiesExpanded);
    }

    const fetchActivities = async () => {
        await http.get('/activities').then(response => {
            if (response.status === 200) {
                setActivities(response.data)
            }
        })
    }

    return (
        <section className={cn('section')}>
            <div className={cn('container')}>
                <h1>Кружки</h1>
                <ActivityList activities={activities} activitiesExpanded={activitiesExpanded} />
                <div className={styles.expandActivitiesBtn} onClick={handleExpandActivitiesBtnClick}>
                    <p className={cn(styles.expandText, styles.Medium, { [styles.hideActivities]: activitiesExpanded })}>
                        {activitiesExpanded ? 'скрыть' : 'показать еще'}
                        <img className={styles.arrowImg} src={arrowSVG} alt="Arrow pointing down img"></img>
                    </p>
                </div>
            </div>

        </section >
    )
}

export default ActivitiesBlock;