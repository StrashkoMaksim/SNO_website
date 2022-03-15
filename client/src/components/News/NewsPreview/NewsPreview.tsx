import React, { FC } from 'react'
import styles from "./NewsPreview.module.scss"
import cn from "classnames"
import InfoLabel from '../../InfoLabel/InfoLabel'
import { Link } from "react-router-dom";

interface NewsPreviewProps {
    id: string
    imgSrc: string | Blob
    title: string
    shortInfo: string
    tags: any[]
    date: string
    isAdmin?: true
}


const NewsPreview: FC<NewsPreviewProps> = (
    { id, imgSrc, title, shortInfo, tags, date, isAdmin }) => {

    // Переводит дату из серверного timestamp в читаемый вид
    const convertDate = (date: string) => {
        return date
            .slice(0, 10)
            .split('-')
            .reverse()
            .join('/')
    }

    const trimDescriptionText = (text: string) => {
        text = text.slice(0, 180) + '... '
        return text;
    }

    return (
        <article className={styles.newsArticle}>
            <div className={styles.imgContainer}>
                <img className={styles.previewImg} src={`${process.env.REACT_APP_SERVER_URL}/${imgSrc}`} alt="News picture" />
            </div>
            <InfoLabel text={convertDate(date)} />
            <div className={styles.newsArticle__Text}>
                <h2>{title}</h2>
                <p className={cn(styles.shortInfo, "Light")}>
                    {trimDescriptionText(shortInfo)}
                    {isAdmin ?
                        <Link to={'/admin/news/' + id} className={styles.readMoreLink}>Редактировать</Link>
                        :
                        <Link to={'/news/' + id} className={styles.readMoreLink}>Читать дальше</Link>
                    }
                </p>
                <div className={styles.tagsWrapper}>
                    {tags.map(tag => <Link to={`/news?tag=${tag._id}`} className={cn(styles.tag, 'Regular')} key={tag._id}>{tag.name}</Link>)}
                </div>
            </div>
        </article>
    )
}

export default NewsPreview