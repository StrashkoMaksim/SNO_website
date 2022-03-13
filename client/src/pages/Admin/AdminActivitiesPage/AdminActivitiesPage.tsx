import React, { FC, useEffect } from 'react'
import styles from "../AdminNewsPage/AdminNewsPage.module.scss"
import plusIcon from "../../../assets/img/plus.svg"
import ActivityList from "../../../components/Activities/ActivityList/ActivityList"
import LinkButton from "../../../components/LinkButton/LinkButton"
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useActions } from '../../../hooks/useActions'

const AdminActivtiesPage: FC = () => {
    const { activities } = useTypedSelector(state => state.activity)
    const { fetchActivityPreviews } = useActions()

    useEffect(() => {
        fetchActivityPreviews()
    }, [])

    return (
        <>
            <header className="adminHeader">
                <h1 className="adminH1">Кружки</h1>
                <div className="btns">
                    <LinkButton
                        to="add"
                        text={'Добавить кружок'}
                        imgSrc={plusIcon} />
                </div>
            </header>
            <ActivityList activities={activities} activitiesExpanded={true} isAdmin/>
        </>
    )
}

export default AdminActivtiesPage