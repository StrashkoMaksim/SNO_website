import React, { ComponentRef, FC, FormEvent, useEffect, useState } from 'react'
import Editor from "../../../components/Editor/Editor";
import LinkBack from "../../../components/LinkBack/LinkBack";
import { useNavigate, useParams } from "react-router-dom";
import deleteIcon from '../../../assets/img/red_trash.svg'
import DefaultButton, { ButtonStyles, ButtonTypes } from "../../../components/DefaultButton/DefaultButton";
import axios, { AxiosError } from "axios";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import TagsInput from "../../../components/TagsInput/TagsInput";
import { useActions } from "../../../hooks/useActions";
import styles from "./AdminNewsAddPage.module.scss"
import cn from 'classnames';
import InfoLabel from '../../../components/InfoLabel/InfoLabel';
import placeholderImg from '../../../assets/img/placeholderImg.png'
import TextareaAutosize from 'react-textarea-autosize';
import TagsSelector from './TagsSelector/TagsSelector';

const AdminNewsAddPage: FC = () => {
    const { id: newsId } = useParams()
    const { news } = useTypedSelector(state => state)
    const { tags } = useTypedSelector(state => state.tag)
    const { fetchNewsAdmin, changeNewsState, deleteNews } = useActions()
    const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())
    const [submitError, setSubmitError] = useState<string>('')
    const navigate = useNavigate()
    const { fetchTags } = useActions()

    const [todayDate, setTodayDate] = useState<string>('')
    const [newsImage, setNewsImage] = useState<string>(placeholderImg)

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

    useEffect(() => {
        const today = new Date()
        const day = today.getDate()
        const month = today.getMonth() + 1 //getMonth возвращает число от 0 до 11 (почему-то)
        const year = today.getFullYear()

        setTodayDate(`${day}/${month}/${year}`)
    })


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
                    headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
                })
            } else {
                await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/news`, formData, {
                    headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
                })
            }
            navigate('/admin/news')
        } catch (e) {
            const error = e as Error | AxiosError;
            if (axios.isAxiosError(error)) {
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

    const onChangeTextInputsHandle = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // @ts-ignore
        news.news[0][e.currentTarget.name] = e.currentTarget.value
        changeNewsState(news)
    }


    const tagsInputHandler = (name: string) => {
        const tmpSet = selectedTags
        if (tmpSet.has(name)) {
            tmpSet.delete(name)
        } else {
            tmpSet.add(name)
        }

        setSelectedTags(new Set(Array.from(tmpSet)))
    }

    const onPreviewImgLoad = (event: any) => {

        const img = event.target.files[0];

        if (img) {
            const imgURL = URL.createObjectURL(img)
            setNewsImage(imgURL)
        }
    }

    return (
        <>
            <LinkBack to="/admin/news" text="Вернуться к списку новостей" />
            <div className={styles.adminHeader}>
                <h1 className={styles.adminH1}>
                    {newsId ? 'Редактировать новость' : 'Добавить новость'}
                </h1>
                {newsId &&
                    <div className={styles.btns}>
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

            <form className={styles.newsArticleForm}>
                <InfoLabel text={todayDate} />

                <input
                    className={styles['visually-hidden']}
                    type="file"
                    placeholder="Введите описание"
                    name="previewImg"
                    accept=".jpg"
                    required={!newsId}
                    id='previewImg'
                    onChange={onPreviewImgLoad} />

                <label htmlFor='previewImg' className={styles.imgContainer}>
                    <img className={styles.previewImg} src={newsId ? 'Тут должна быть картинка с новости' : newsImage} alt="News picture" />
                </label>

                <div className={styles.newsArticleForm__Content}>
                    <div className={styles.newsArticle__Text}>
                        <TextareaAutosize
                            className={cn(styles['newsArticleForm__input'], styles['newsArticleForm__input-title'])}
                            placeholder="Заголовок"
                            name="title"
                            value={news.news[0] ? news.news[0].title : ''}
                            onChange={onChangeTextInputsHandle}
                            required />

                        <TextareaAutosize
                            className={cn(styles['newsArticleForm__input'], styles['newsArticleForm__input-description'])}
                            placeholder="Описание"
                            name="previewText"
                            value={news.news[0] ? news.news[0].previewText : ''}
                            onChange={onChangeTextInputsHandle}
                            required />

                        <TagsSelector tags={tags} selectedTags={selectedTags} onInput={tagsInputHandler} />

                    </div>
                </div>

            </form>

            <form className={styles['admin-add-form']} onSubmit={submitHandler}>

                <InfoLabel text={todayDate} />
                <TextareaAutosize
                    className={cn(styles['newsArticleForm__input'], styles['newsArticleForm__input-title'], styles['admin-add-form__input-title'])}
                    placeholder="Заголовок"
                    name="title"
                    value={news.news[0] ? news.news[0].title : ''}
                    onChange={onChangeTextInputsHandle}
                    required />

                <TextareaAutosize
                    className={cn(styles['newsArticleForm__input'], styles['newsArticleForm__input-description'])}
                    placeholder="Описание"
                    name="previewText"
                    value={news.news[0] ? news.news[0].previewText : ''}
                    onChange={onChangeTextInputsHandle}
                    required />

                <Editor onInitialize={editorInitializeHandler} />

                <div className={styles["admin-add-form__field"]}>
                    <span className={styles["admin-add-form__error"]}>{submitError}</span>
                </div>
                <DefaultButton
                    text="Сохранить новость"
                    style={ButtonStyles.filled}
                    type={ButtonTypes.submit} />
            </form>
        </>
    )
}

export default AdminNewsAddPage