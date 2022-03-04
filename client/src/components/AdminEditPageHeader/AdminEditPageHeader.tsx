import LinkBack from "../LinkBack/LinkBack";
import { FC } from 'react'
import styles from './AdminEditPageHeader.module.scss'
import DefaultButton, { ButtonStyles, ButtonTypes } from "../DefaultButton/DefaultButton";
import deleteIcon from '../../assets/img/red_trash.svg'

export enum AEPHTypes {
    news = 'news',
    activity = 'activity'
}

const nouns = {
    news: {
        single: 'новость',
        plural: 'новостей'
    },
    activity: {
        single: 'кружок',
        plural: 'кружков'
    }
}

interface AEPHProps {
    linkTo: string,
    headerForObj: string | undefined,
    headerFor: AEPHTypes,
    onDeleteBtnClick: () => void
}

const AdminEditPageHeader: FC<AEPHProps> = ({ linkTo, headerForObj, headerFor, onDeleteBtnClick }) => {

    return (
        <>
            <LinkBack to={linkTo} text={`Вернуться к списку ${nouns[headerFor].plural}`} />
            <div className={styles.adminHeader}>
                <h1 className={styles.adminH1}>
                    {(headerForObj ? 'Редактировать ' : 'Добавить ') + nouns[headerFor].single}
                </h1>
                {headerForObj &&
                    <div className={styles.btns}>
                        <DefaultButton
                            text="Удалить новость"
                            imgSrc={deleteIcon}
                            style={ButtonStyles.outlined}
                            type={ButtonTypes.button}
                            onClick={onDeleteBtnClick}
                        />
                    </div>
                }
            </div>
        </>
    )
}

export default AdminEditPageHeader