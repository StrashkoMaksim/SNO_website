import React, { useState } from 'react'
import LinkButton from "../../../components/LinkButton/LinkButton"
import DefaultButton, { ButtonStyles, ButtonTypes } from '../../../components/DefaultButton/DefaultButton'
import NewsList from "../../../components/News/NewsList/NewsList";
import styles from './AdminNewsPage.module.scss'
import searchIcon from '../../../assets/img/search.svg'
import plusIcon from '../../../assets/img/plus.svg'
import settingsIcon from '../../../assets/img/settings.svg'
import TagsModal from "../../../components/TagsModal/TagsModal";
import NewsWithPagination from '../../../components/News/NewsWithPagination/NewsWithPagination';

const AdminNewsPage = () => {
    const [isTagsModalVisible, setIsTagsModalVisible] = useState<boolean>(false)

    const onOpenModalHandler = () => {
        setIsTagsModalVisible(true)
    }

    const onCloseModalHandler = () => {
        setIsTagsModalVisible(false)
    }

    return (
        <>
            <header className="adminHeader">
                <h1 className='adminH1'>Новости</h1>
                <div className='btns'>
                    <DefaultButton
                        text={'Управление тегами'}
                        imgSrc={settingsIcon}
                        style={ButtonStyles.outlined}
                        type={ButtonTypes.button}
                        extraClass={styles.AdminOutlinedButton}
                        onClick={onOpenModalHandler} />
                    <LinkButton
                        text={'Добавить новость'}
                        imgSrc={plusIcon}
                        to={'/admin/news/add'} />
                </div>
            </header>
            <NewsWithPagination isAdmin/>
            {isTagsModalVisible &&
                <TagsModal isVisible={isTagsModalVisible} onClose={onCloseModalHandler} />
            }
        </>
    )
}

export default AdminNewsPage