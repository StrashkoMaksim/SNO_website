import React, { FC } from 'react'
import cn from "classnames"
import Activity from "../Activity/Activity"
import mockLogo from "../../../assets/img/mockActivityLogo.svg"
import styles from './ActivityList.module.scss'

interface ActivityListProps {
    activities: any[]
    activitiesExpanded: boolean
}

const ActivityList: FC<ActivityListProps> = ({ activities, activitiesExpanded }) => {
    return (
        <div className={cn(styles.activitiesBlock, { [styles.expandedBlock]: activitiesExpanded })}>
            {activities.map(activity =>
                <Activity
                    // id={activity._id}
                    // imgSrc={activity.imgSrc}
                    // title={activity.title}
                    // shortInfo={activity.shortInfo}
                    key={activity.id}
                    id={'5235'}
                    imgSrc={mockLogo}
                    title='Математическое моделирование'
                />
            )}
        </div>
    )
}

export default ActivityList