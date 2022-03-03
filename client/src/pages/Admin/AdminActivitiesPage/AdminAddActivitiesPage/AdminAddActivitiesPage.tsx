import DefaultButton, { ButtonStyles, ButtonTypes } from "../../../../components/DefaultButton/DefaultButton";
import LinkBack from "../../../../components/LinkBack/LinkBack";
import styles from './AdminAddActivitiesPage.module.scss'
import deleteIcon from '../../../../assets/img/red_trash.svg'

const AdminAddActivitiesPage = () => {

    const activityId = undefined;

    return (
        <>
            <LinkBack to="/admin/news" text="Вернуться к списку кружков" />
            <div className={styles.adminHeader}>
                <h1 className={styles.adminH1}>
                    {activityId ? 'Редактировать кружок' : 'Добавить кружок'}
                </h1>
                {activityId &&
                    <div className={styles.btns}>
                        <DefaultButton
                            text="Удалить новость"
                            imgSrc={deleteIcon}
                            style={ButtonStyles.outlined}
                            type={ButtonTypes.button}
                        // onClick={onDeleteHandler}
                        />
                    </div>
                }
            </div>

            
        </>
    )
}

export default AdminAddActivitiesPage;