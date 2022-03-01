import React, {ComponentRef, FC, FormEvent, useEffect, useState} from 'react'
import AdminLayout from "../../../components/AdminLayout/AdminLayout"
import Editor from "../../../components/Editor/Editor";
import LinkBack from "../../../components/LinkBack/LinkBack";
import {useNavigate, useParams} from "react-router-dom";
import deleteIcon from '../../../assets/img/red_trash.svg'
import DefaultButton, { ButtonStyles, ButtonTypes } from "../../../components/DefaultButton/DefaultButton";
import axios, {AxiosError} from "axios";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import TagsInput from "../../../components/TagsInput/TagsInput";
import {useActions} from "../../../hooks/useActions";

const AdminNewsAddPage: FC = () => {
    const { id: newsId } = useParams()
    const { news } = useTypedSelector(state => state)
    const { tags } = useTypedSelector(state => state.tag)
    const { fetchNewsAdmin, changeNewsState, deleteNews } = useActions()
    const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())
    const [submitError, setSubmitError] = useState<string>('')
    const navigate = useNavigate()
    const { fetchTags } = useActions()

    useEffect(() => {
        changeNewsState({
            loading: false,
            error: null,
            news: [{
                _id: '',
                title: '',
                previewText: '',
                previewImg: '',
                content: '',
                date: '',
                tags: []
            }]
        })
    }, [])

    useEffect(() => {
        const fetchNews = async () => {
            if (newsId) {
                fetchNewsAdmin(newsId)
            }
        }

        fetchNews()
    }, [])

    useEffect(() => {
        fetchTags()
    }, [])

    useEffect(() => {
        if (news.news[0] && news.news[0].content) {
            const blocks = JSON.parse(news.news[0].content)
            // @ts-ignore
            blocks.forEach(async block => {
                if (block.type === 'image') {
                    block.data.file = { url: `${process.env.REACT_APP_SERVER_URL}/${block.data.src}` }
                }
            })

            setTimeout(() => {
                // @ts-ignore
                editorCore.current.render({ blocks })
            }, 500)
            // @ts-ignore
            setSelectedTags(new Set(news.news[0].tags))
        }
    }, [news])


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
        for (const block of editorContent.blocks) {
            if (block.type === 'image') {
                if (block.data.file.source) {
                    formData.set(block.id, block.data.file.source)
                    block.data.file = undefined
                } else {
                    const file = await fetch(block.data.file.url).then(r => r.blob())
                    formData.set(block.id, file, block.id + '.jpg')
                }
            }
        }
        formData.set('content', JSON.stringify(editorContent.blocks))
        formData.set('tags', JSON.stringify(Array.from(selectedTags)))

        try {
            if (newsId) {
                await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/news/${newsId}`, formData, {
                    headers: {authorization: `Bearer ${localStorage.getItem('token')}`}
                })
            } else {
                await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/news`, formData, {
                    headers: {authorization: `Bearer ${localStorage.getItem('token')}`}
                })
            }
            navigate('/admin/news')
        } catch (e) {
            const error = e as Error | AxiosError;
            if(axios.isAxiosError(error)) {
                setSubmitError(error.response?.data.message)
            }
        }
    }

    const onDeleteHandler = async () => {
        if (newsId) {
            await deleteNews(newsId)

            if (!news.error) {
                navigate('/admin/news')
            }
        }
    }

    const onChangeTextInputsHandle = (e: FormEvent<HTMLInputElement>) => {
        // @ts-ignore
        news.news[0][e.currentTarget.name] = e.currentTarget.value
        changeNewsState(news)
    }

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

    return (
        <>
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
                            onClick={onDeleteHandler}
                        />
                    </div>
                }
            </div>
            <form className="admin-add-form" onSubmit={submitHandler}>
                <div className="admin-add-form__field">
                    <span className="admin-add-form__field-name">Заголовок</span>
                    <input type="text" placeholder="Введите заголовок" name="title"
                           value={news.news[0] ? news.news[0].title : ''}
                           onChange={onChangeTextInputsHandle}
                           required />
                </div>
                <div className="admin-add-form__field">
                    <span className="admin-add-form__field-name">Описание</span>
                    <input type="text" placeholder="Введите описание" name="previewText"
                           value={news.news[0] ? news.news[0].previewText : ''}
                           onChange={onChangeTextInputsHandle}
                           required />
                </div>
                <div className="admin-add-form__field">
                    <span className="admin-add-form__field-name">
                        {newsId ? 'Замена превью' : 'Превью'}
                    </span>
                    <input type="file" placeholder="Введите описание" name="previewImg" accept=".jpg"
                           required={!newsId} />
                </div>
                <div className="admin-add-form__field">
                    <span className="admin-add-form__field-name">Контент</span>
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
        </>
    )
}

export default AdminNewsAddPage