import { FC } from 'react'
import cn from "classnames"
import Activity from "../Activity/Activity"
import styles from './ActivityList.module.scss'

interface ActivityListProps {
    activities: any[]
    activitiesExpanded: boolean
    isAdmin?: boolean
}

const ActivityList: FC<ActivityListProps> = ({ activities, activitiesExpanded, isAdmin }) => {
    return (
        <div className={cn(styles.activitiesBlock, { [styles.expandedBlock]: activitiesExpanded })}>
            {activities?.map(activity =>
                <Activity
                    key={activity._id}
                    id={activity._id}
                    imgSrc={activity.logo}
                    title={activity.name}
                    isAdmin={isAdmin}
                />
            )}
        </div>
    )
}

export default ActivityList