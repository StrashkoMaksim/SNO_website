import React, { ComponentRef, FC, FormEvent, useEffect, useState } from 'react'
import Editor from "../../../../components/Editor/Editor";
import LinkBack from "../../../../components/LinkBack/LinkBack";
import { useNavigate, useParams } from "react-router-dom";
import deleteIcon from '../../../../assets/img/red_trash.svg'
import DefaultButton, { ButtonStyles, ButtonTypes } from "../../../../components/DefaultButton/DefaultButton";
import axios, { AxiosError } from "axios";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";
import styles from "./AdminNewsAddPage.module.scss"
import InfoLabel from '../../../../components/InfoLabel/InfoLabel';
import TagsSelector from './TagsSelector/TagsSelector';
import { Tag } from '../../../../types/tag';
import AdminFormInputText, { AFITStyle } from '../../../../components/Admin/AdminFormInputText/AdminFormInputText';
import AdminFormInputImg from '../../../../components/Admin/AdminFormInputImg/AdminFormInputImg';
import placeholderImg from '../../../../assets/img/placeholderImg.png'

const AdminNewsAddPage: FC = () => {
    const { id: newsId } = useParams()
    const { news } = useTypedSelector(state => state)
    const { tags } = useTypedSelector(state => state.tag)
    const { fetchNewsAdmin, changeNewsState, deleteNews } = useActions()
    const [selectedTags, setSelectedTags] = useState<Set<Tag>>(new Set())
    const [submitError, setSubmitError] = useState<string>('')
    const [previewImg, setPreviewImg] = useState<string | Blob>('')
    const navigate = useNavigate()
    const { fetchTags } = useActions()

    const [todayDate, setTodayDate] = useState<string>('')

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
    }, [])


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
        formData.set('previewImg', previewImg);
        formData.set('content', JSON.stringify(editorContent.blocks))
        formData.set('tags', JSON.stringify(Array.from(selectedTags).map(tag => tag._id)))

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


    const tagsInputHandler = (tag: Tag) => {

        const filterSelected = Array.from(selectedTags)
            .filter(selctd_tag => selctd_tag.name !== tag.name)

        let newSet: Set<Tag>;

        if (filterSelected.length < selectedTags.size) {
            newSet = new Set(filterSelected)
        } else {
            newSet = selectedTags.add(tag)
        }

        setSelectedTags(newSet)
    }


    const trimDescriptionText = (text: string) => {
        text = text.slice(0, 180) + '...'
        return text;
    }


    const onPreviewImgLoad = (event: any) => {
        const img = event.target.files[0];
        setPreviewImg(img)
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

            <div className={styles.newsArticlePreview}>
                <InfoLabel text={todayDate} />

                <AdminFormInputImg
                    name="previewImg"
                    onChange={onPreviewImgLoad}
                    id='newsPreviewInputImg'
                    extraClass={styles.imgContainer}
                    defaultImg={placeholderImg}
                />

                <div className={styles.newsArticlePreview__Content}>

                    <h2 className={styles.newsArticlePreview__Content__Title}>
                        {news.news[0] ? news.news[0].title : 'Заголовок'}
                    </h2>

                    <p className={styles.newsArticlePreview__Content__Paragraph}>
                        {news.news[0] ? trimDescriptionText(news.news[0].previewText) : 'Описание'}
                        <span className={styles.readMoreLink}> Читать дальше</span>
                    </p>

                    <div className={styles.tagsWrapper}>
                        {Array.from(selectedTags).map(tag =>
                            <div
                                key={tag._id}
                                className={styles.tag}
                            >
                                {tag.name}
                            </div>
                        )}
                    </div>
                </div>

            </div>

            <form className={styles['admin-add-form']} onSubmit={submitHandler}>

                <InfoLabel text={todayDate} />

                <AdminFormInputText
                    style={AFITStyle.textarea}
                    placeholder="Заголовок"
                    name="title"
                    value={news.news[0] ? news.news[0].title : ''}
                    onChange={onChangeTextInputsHandle}
                    extraClass={styles['newsArticleForm-title']}
                    required
                />

                <TagsSelector tags={tags} selectedTags={selectedTags} onInput={tagsInputHandler} />

                <AdminFormInputText
                    style={AFITStyle.textarea}
                    placeholder="Описание"
                    name="previewText"
                    value={news.news[0] ? news.news[0].previewText : ''}
                    onChange={onChangeTextInputsHandle}
                    extraClass={styles['newsArticleForm-description']}
                    required
                />

                <Editor onInitialize={editorInitializeHandler} />

                <div className={styles["admin-add-form__field"]}>
                    <span className={styles["admin-add-form__error"]}>{submitError}</span>
                </div>
                <DefaultButton
                    text="Сохранить новость"
                    style={ButtonStyles.filled}
                    type={ButtonTypes.submit}
                    extraClass={styles.alignSelfCenter}
                />
            </form>
        </>
    )
}

export default AdminNewsAddPage