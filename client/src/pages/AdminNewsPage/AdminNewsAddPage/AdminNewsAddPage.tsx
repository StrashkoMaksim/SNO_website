import React, {ComponentRef, FC, FormEvent, useEffect, useState} from 'react'
import AdminLayout from "../../../components/AdminLayout/AdminLayout"
import Editor from "../../../components/Editor/Editor";
import LinkBack from "../../../components/LinkBack/LinkBack";
import {useNavigate, useParams} from "react-router-dom";
import deleteIcon from '../../../assets/img/red_trash.svg'
import DefaultButton, { ButtonStyles, ButtonTypes } from "../../../components/DefaultButton/DefaultButton";
import axios from "axios";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import TagsInput from "../../../components/TagsInput/TagsInput";
import {useActions} from "../../../hooks/useActions";

const AdminNewsAddPage: FC = () => {
    const { id: newsId } = useParams()
    const { tags } = useTypedSelector(state => state.tag)
    const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())
    const [submitError, setSubmitError] = useState<string>('')
    const navigate = useNavigate()

    const { fetchTags } = useActions()

    useEffect(() => {
        fetchTags()
    }, [])

    const tagsInputHandler = (e: FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        const tmpSet = selectedTags

        if (tmpSet.has(value)) {
            tmpSet.delete(value)
        } else {
            tmpSet.add(value)
        }

        setSelectedTags(new Set(Array.from(tmpSet)))
    }

    const editorCore = React.useRef<ComponentRef<any>>(null)

    const editorInitializeHandler = React.useCallback((instance) => {
        editorCore.current = instance
    }, [])

    const getEditorContent = React.useCallback(async () => {
        // @ts-ignore
        return await editorCore.current.save();
    }, [])

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const editorContent = await getEditorContent()

        // @ts-ignore
        editorContent.blocks.forEach(block => {
            if (block.type === 'image') {
                formData.set(block.id, block.data.file.source)
                block.data.file = undefined
            }
        })
        formData.set('content', JSON.stringify(editorContent.blocks))
        formData.set('tags', JSON.stringify(Array.from(selectedTags)))

        let response: { message: string, status: number }

        if (newsId) {
            response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/news/${newsId}`, formData, {
                headers: {authorization: `Bearer ${localStorage.getItem('token')}`}
            })
        } {
            response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/news`, formData, {
                headers: {authorization: `Bearer ${localStorage.getItem('token')}`}
            })
        }

        if (response.status === 201) {
            navigate('/admin/news')
        } else {
            setSubmitError(response.message)
        }
    }

    return (
        <>
            <AdminLayout>
                <LinkBack to="/admin/news" text="Вернуться к списку новостей" />
                <div className="adminHeader">
                    <h1 className="adminH1">
                        {newsId ? 'Редактировать новость' : 'Добавить новость'}
                    </h1>
                    {newsId &&
                        <div className="btns">
                            <DefaultButton
                                text="Удалить новость"
                                imgSrc={deleteIcon}
                                style={ButtonStyles.outlined}
                                type={ButtonTypes.button}
                            />
                        </div>
                    }
                </div>
                <form className="admin-add-form" onSubmit={submitHandler}>
                    <div className="admin-add-form__field">
                        <span className="admin-add-form__field-name">Заголовок</span>
                        <input type="text" placeholder="Введите заголовок" name="title" required />
                    </div>
                    <div className="admin-add-form__field">
                        <span className="admin-add-form__field-name">Описание</span>
                        <input type="text" placeholder="Введите описание" name="previewText" required />
                    </div>
                    <div className="admin-add-form__field">
                        <span className="admin-add-form__field-name">Превью</span>
                        <input type="file" placeholder="Введите описание" name="previewImg" accept=".jpg" required />
                    </div>
                    <div className="admin-add-form__field">
                        <span className="admin-add-form__field-name">Контент</span>
                        {/*// @ts-ignore*/}
                        <Editor onInitialize={editorInitializeHandler} />
                    </div>
                    <div className="admin-add-form__field">
                        <span className="admin-add-form__field-name">Теги</span>
                        <TagsInput tags={tags} selectedTags={selectedTags} onInput={tagsInputHandler} />
                    </div>
                    <div className="admin-add-form__field">
                        <span className="admin-add-form__error">{submitError}</span>
                        <DefaultButton
                            text="Сохранить новость"
                            style={ButtonStyles.filled}
                            type={ButtonTypes.submit} />
                    </div>
                </form>
            </AdminLayout>
        </>
    )
}

export default AdminNewsAddPage;