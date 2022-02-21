import styles from './ActivitiesBlock.module.scss'
import React, { useState, useEffect } from 'react'
import Activity from './Activity';
import mockLogo from '../../assets/img/mockActivityLogo.png'
import http from '../../assets/http-config';
import { response } from 'express';
import cn from 'classnames';

const ActivitiesBlock = () => {
    const [activities, setActivities] = useState<any[]>([]);
    const [expandActivities, setExpandActivities] = useState<boolean>(false);

    useEffect(() => {
        // const fetchActivities = async () => {
        //     return await http.get('/activities')

        // }

        // fetchActivities()
        //     .then(response => {
        //         if (response.status === 200) {
        //             setActivities(response.data)
        //         }
        //     })

        //Пока просто мок-объект
        setActivities([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    }, [])

    return (
        <section className={cn('section')}>
            <div className={cn('container')}>
                <h1>Кружки</h1>
                <div className={styles.activitiesBlock}>
                    {activities.map(activity => <Activity
                        // imgSrc={activity.imgSrc} 
                        // title={activity.title}
                        // shortInfo={activity.shortInfo}

                        imgSrc={mockLogo}
                        title='Кружок n'
                        shortInfo='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula posuere ipsum'
                    />)}
                </div>
            </div>
        </section>
    )
}

export default ActivitiesBlock;