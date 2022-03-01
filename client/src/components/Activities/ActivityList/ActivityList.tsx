import React, {FC} from 'react'
import cn from "classnames"
import Activity from "../Activity/Activity"
import mockLogo from "../../../assets/img/mockActivityLogo.png"
import styles from './ActivityList.module.scss'

interface ActivityListProps {
    activities: any[]
}

const ActivityList: FC<ActivityListProps> = ({ activities }) => {
    return (
        <div className={cn(styles.activitiesBlock)}>
            {activities.map(activity =>
                <Activity
                    // id={activity._id}
                    // imgSrc={activity.imgSrc}
                    // title={activity.title}
                    // shortInfo={activity.shortInfo}
                    id={'5235'}
                    imgSrc={mockLogo}
                    title='Кружок n'
                    shortInfo='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vehicula posuere ipsum'
                />
            )}
        </div>
    )
}

export default ActivityList