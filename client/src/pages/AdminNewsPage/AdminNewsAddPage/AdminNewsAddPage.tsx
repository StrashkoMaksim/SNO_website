import React, {FC} from 'react'
import AdminLayout from "../../../components/AdminLayout/AdminLayout"
import Editor from "../../../components/Editor/Editor";
import LinkBack from "../../../components/LinkBack/LinkBack";
import {useParams} from "react-router-dom";
import OutlinedButton from "../../../components/OutlinedButton/OutlinedButton";
import deleteIcon from '../../../assets/img/red_trash.svg'
import DefaultButton from "../../../components/DefaultButton/DefaultButton";

const AdminNewsAddPage: FC = () => {
    const { id: newsId }  = useParams()

    return (
        <>
            <AdminLayout>
                <LinkBack to="/admin/news" text="Вернуться к списку новостей"/>
                <div className="adminHeader">
                    <h1 className="adminH1">
                        {newsId ? 'Редактировать новость' : 'Добавить новость'}
                    </h1>
                    {newsId &&
                        <div className="btns">
                            <OutlinedButton text="Удалить новость" imgSrc={deleteIcon}
                                            style={{
                                                border: '1px solid rgba(221, 70, 70, 0.12)',
                                                color: '#DD4646'
                                            }} />
                        </div>
                    }
                </div>
                <form className="admin-add-form">
                    <div className="admin-add-form__field">
                        <span className="admin-add-form__field-name">Заголовок</span>
                        <input type="text" placeholder="Введите заголовок" required />
                    </div>
                    <div className="admin-add-form__field">
                        <span className="admin-add-form__field-name">Описание</span>
                        <input type="text" placeholder="Введите описание" required />
                    </div>
                    <div className="admin-add-form__field">
                        <span className="admin-add-form__field-name">Контент</span>
                        <Editor />
                    </div>
                    <div className="admin-add-form__field">
                        <span></span>
                        <DefaultButton text="Сохранить новость" style={{width: 'fit-content'}}/>
                    </div>
                </form>
            </AdminLayout>
        </>
    )
}

export default AdminNewsAddPage;