import React, {useState} from 'react'
import AdminLayout from "../../components/AdminLayout/AdminLayout"
import LinkButton from "../../components/LinkButton/LinkButton"
import OutlinedButton from "../../components/OutlinedButton/OutlinedButton"

import styles from './AdminNewsPage.module.scss'

import searchIcon from '../../assets/img/search.svg'
import plusIcon from '../../assets/img/plus.svg'
import settingsIcon from '../../assets/img/settings.svg'

const AdminNewsPage = () => {
    const [isTagsModalVisible, setIsTagsModalVisible] = useState<boolean>(false)

    return (
        <>
            <AdminLayout>
                <header className={styles.header}>
                    <div className={styles.search}>
                        <img src={searchIcon} alt="Поиск" />
                        <input type="text" placeholder="Введите название новости" />
                    </div>
                    <div className={styles.btns}>
                        <OutlinedButton text={'Управление тегами'} imgSrc={settingsIcon}/>
                        <LinkButton text={'Добавить новость'} imgSrc={plusIcon}
                                    to={'/admin/news/add'} />
                    </div>
                </header>
            </AdminLayout>
        </>
    )
}

export default AdminNewsPage