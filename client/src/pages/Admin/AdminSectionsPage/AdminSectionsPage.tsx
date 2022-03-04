import React, { FC } from 'react'
import styles from "../AdminNewsPage/AdminNewsPage.module.scss"
import plusIcon from "../../assets/img/plus.svg"
import ActivityList from "../../../components/Activities/ActivityList/ActivityList"
import LinkButton from "../../../components/LinkButton/LinkButton";

const AdminSectionsPage: FC = () => {
    const activities: any[] = ['5', '3']

    return (
        <>
            <header className={styles.header}>
                <h1 className="adminH1">Кружки</h1>
                <div className={styles.btns}>
                    <LinkButton
                        to="add"
                        text={'Добавить кружок'}
                        imgSrc={plusIcon} />
                </div>
            </header>
            <ActivityList activities={activities} activitiesExpanded />
        </>
    )
}

export default AdminSectionsPage