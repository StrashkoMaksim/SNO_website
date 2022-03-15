import React, { ComponentRef, FC, FormEvent, useEffect, useState } from 'react'
import Editor, { getEditorContent } from "../../../../components/Editor/Editor";
import { useNavigate, useParams } from "react-router-dom";
import DefaultButton, { ButtonStyles, ButtonTypes } from "../../../../components/DefaultButton/DefaultButton";
import { AxiosResponse } from "axios";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";
import styles from "./AdminNewsAddPage.module.scss"
import InfoLabel from '../../../../components/InfoLabel/InfoLabel';
import TagsSelector from './TagsSelector/TagsSelector';
import { Tag } from '../../../../types/tag';
import AdminFormInputText, { AFITStyle } from '../../../../components/Admin/AdminFormInputText/AdminFormInputText';
import AdminFormInputImg from '../../../../components/Admin/AdminFormInputImg/AdminFormInputImg';
import AdminEditPageHeader, { AEPHTypes } from '../../../../components/AdminEditPageHeader/AdminEditPageHeader';
import { Dispatch } from "redux";
import { emptyNews, News, NewsAction } from "../../../../types/news";
import cn from 'classnames';

const AdminNewsAddPage = () => {
    const { id: newsId } = useParams()
    const { news, error } = useTypedSelector(state => state.news)
    const { tags } = useTypedSelector(state => state.tag)
    const { fetchTags, fetchNewsAdmin, addNews, updateNews, deleteNews } = useActions()
    const [todayDate, setTodayDate] = useState<string>('')
    const [selectedTags, setSelectedTags] = useState<Set<Tag>>(new Set())

    const [newsState, setNewsState] = useState<News>(emptyNews)
    const navigate = useNavigate()
    const [errorText, setErrorText] = useState<string>('')
    const editorCore = React.useRef<ComponentRef<any>>(null)

    const editorInitializeHandler = React.useCallback((instance) => {
        editorCore.current = instance
    }, [])

    useEffect(() => {
        const today = new Date()
        const day = today.getDate()
        const month = today.getMonth() + 1 //getMonth возвращает число от 0 до 11 (почему-то)
        const year = today.getFullYear()

        setTodayDate(`${day}/${month}/${year}`)

        fetchTags()
    }, [])

    // Получаем айдишник новости и если он существует - фетчим ее данные
    useEffect(() => {
        if (newsId) {
            fetchNewsAdmin(newsId)
        }
    }, [])

    // Если есть айдишник новости и ee данные подгрузились - устанавливаем их в стейт
    useEffect(() => {
        if (news[0] && newsId) {
            setNewsState(news[0])
        }
    }, [news[0]])

    const submitHandler = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const editorContent = await getEditorContent(editorCore)
        const formData = new FormData()

        for (const block of editorContent.blocks) {
            if (block.type === 'image') {
                if (block.data.file.source?.hasOwnProperty('name')) {
                    formData.append('contentImages', block.data.file.source, block.id + '.jpg')
                } else {
                    const file = await fetch(block.data.file.url).then(r => r.blob())
                    formData.append('contentImages', file, block.id + '.jpg')
                }
            }
        }

        formData.set('title', newsState.title)
        formData.set('previewText', newsState.previewText)
        formData.set('date', newsState.date)
        formData.set('previewImg', newsState.previewImg);
        formData.set('content', JSON.stringify(editorContent.blocks))
        formData.set('tags', JSON.stringify(Array.from(selectedTags).map(tag => tag._id)))

        // @ts-ignore
        for(var pair of formData.entries()){

            console.log(pair[0], pair[1]);
        }

        let response: (dispatch: Dispatch<NewsAction>) => Promise<AxiosResponse | undefined>
        if (newsId) {
            response = await updateNews(newsId, formData)
        } else {
            response = await addNews(formData)
        }

        // @ts-ignore
        if (response && response.status === 201) {
            navigate('/admin/news')
        } else if (error) {
            setErrorText(error)
        }
    }

    const onChangeTextInputsHandle = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewsState({ ...newsState, [e.currentTarget.name]: e.currentTarget.value })
    }

    const tagsInputHandler = (tag: Tag) => {
        const filterSelected = Array.from(selectedTags)
            .filter(selctd_tag => selctd_tag.name !== tag.name)

        let newSet: Set<Tag>

        if (filterSelected.length < selectedTags.size) {
            newSet = new Set(filterSelected)
        } else {
            newSet = selectedTags.add(tag)
        }

        setSelectedTags(new Set(Array.from(newSet)))
    }

    const trimDescriptionText = (text: string) => {
        text = text.slice(0, 180) + '...'
        return text;
    }

    const onImgLoad = (img: File) => {
        setNewsState({ ...newsState, previewImg: img })
    }

    const handleDeleteClick = async () => {
        if (newsId) {
            await deleteNews(newsId)
            navigate('/admin/news')
        }
    }

    return (
        <>
            <AdminEditPageHeader
                linkTo='/admin/activities'
                headerForObj={newsId}
                headerFor={AEPHTypes.news}
                onDeleteBtnClick={handleDeleteClick}
            />
            <div className={styles.addNews}>

                <div className={styles.newsArticlePreview}>
                    <InfoLabel text={todayDate} />
                    <AdminFormInputImg
                        name="previewImg"
                        onChange={onImgLoad}
                        id='newsPreviewInputImg'
                        extraClass={styles.imgContainer}
                        defaultImg={newsState.previewImg}
                    />
                    <div className={styles.newsArticlePreview__Content}>
                        <h2 className={styles.newsArticlePreview__Content__Title}>
                            {newsState.title ? newsState.title : 'Заголовок'}
                        </h2>
                        <p className={styles.newsArticlePreview__Content__Paragraph}>
                            {newsState.previewText ? trimDescriptionText(newsState.previewText) : 'Описание'}
                            <span className={styles.readMoreLink}> Читать дальше</span>
                        </p>
                        <div className={styles.tagsWrapper}>
                            {Array.from(selectedTags).map(tag =>
                                <div key={tag._id} className={styles.tag}>{tag.name}</div>
                            )}
                        </div>
                    </div>
                </div>

                <form className='admin-add-form' >
                    <InfoLabel text={todayDate} />
                    <AdminFormInputText
                        style={AFITStyle.textarea}
                        placeholder="Заголовок"
                        name="title"
                        value={newsState.title ? newsState.title : ''}
                        onChange={onChangeTextInputsHandle}
                        extraClass={styles['newsArticleForm-title']}
                        required
                    />
                    <TagsSelector tags={tags} selectedTags={selectedTags} onInput={tagsInputHandler} />
                    <AdminFormInputText
                        style={AFITStyle.textarea}
                        placeholder="Описание"
                        name="previewText"
                        value={newsState.previewText ? newsState.previewText : ''}
                        onChange={onChangeTextInputsHandle}
                        extraClass={styles['newsArticleForm-description']}
                        required
                    />
                    <Editor onInitialize={editorInitializeHandler} />
                    <p className={cn('admin-add-form__error', styles.Error, { [styles['Error-active']]: errorText })}>{errorText}</p>

                </form>

                <DefaultButton
                    text="Сохранить новость"
                    style={ButtonStyles.filled}
                    type={ButtonTypes.button}
                    onClick={submitHandler}
                    extraClass={styles.alignSelfCenter}
                />
            </div>

        </>
    )
}

export default AdminNewsAddPage