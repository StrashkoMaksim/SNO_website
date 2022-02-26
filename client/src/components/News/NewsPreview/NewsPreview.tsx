import React, { FC } from 'react'
import styles from "./NewsPreview.module.scss"
import cn from "classnames"
import InfoLabel from '../../InfoLabel/InfoLabel'
import {Link} from "react-router-dom";

interface NewsPreviewProps {
    id: string
    imgSrc: string
    title: string
    shortInfo: string
    tags: any[]
    date: string
}


const NewsPreview: FC<NewsPreviewProps> = ({ id, imgSrc, title, shortInfo, tags, date }) => {

    // Переводит дату из серверного timestamp в читаемый вид
    const convertDate = (date: string) => {
        return date
            .slice(0, 9)
            .split('-')
            .reverse()
            .join('/')
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
                    {shortInfo}
                    <Link to={'/news/' + id} className={styles.readMoreLink}>Читать дальше</Link>
                </p>
                <div className={styles.tagsWrapper}>
                    {tags.map(tag => <Link to={`/news?tag=${tag._id}`} className={cn(styles.tag, 'Regular')} key={tag._id}>{tag.name}</Link>)}
                </div>
            </div>
        </article>
    )
}

export default NewsPreview