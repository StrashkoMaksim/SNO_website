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
                    key={activity._id}
                    id={activity._id}
                    imgSrc={activity.logo}
                    title={activity.name}
                />
            )}
        </div>
    )
}

export default ActivityList