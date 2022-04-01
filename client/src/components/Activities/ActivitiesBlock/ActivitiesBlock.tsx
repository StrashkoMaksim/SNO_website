import styles from './ActivitiesBlock.module.scss'
import React, { useState, useEffect, FC } from 'react'
import http from '../../../assets/http-config';
import cn from 'classnames';
import arrowSVG from "../../../assets/img/arrow.svg"
import ActivityList from "../ActivityList/ActivityList";
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';

interface ActivitiesBlockProps{
    isAdmin?:boolean
}

const ActivitiesBlock:FC<ActivitiesBlockProps> = ({isAdmin}) => {
    const [activitiesExpanded, setActivitiesExpanded] = useState<boolean>(false);

    const { activities } = useTypedSelector(state => state.activity)
    const { fetchActivityPreviews } = useActions()

    useEffect(() => {
        fetchActivityPreviews()
    }, [])


    const handleExpandActivitiesBtnClick = () => {
        setActivitiesExpanded(!activitiesExpanded);
    }


    return (
        <section className={cn('section')}>
            <div className={cn('container')}>
                <h1>Кружки</h1>
                <ActivityList activities={activities} activitiesExpanded={activitiesExpanded} isAdmin={isAdmin}/>
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