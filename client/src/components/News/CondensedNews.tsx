import React, { FC, useEffect, useState } from 'react';
import styles from "./CondensedNews.module.scss"
import cn from "classnames"
import InfoLabel from '../InfoLabel/InfoLabel'

interface CondensedNewsProps {
    imgSrc: string,
    title: string,
    shortInfo: string,
    tags: any[],
    date: string
}


const CondensedNews: FC<CondensedNewsProps> = ({ imgSrc, title, shortInfo, tags, date }) => {

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
            <InfoLabel text={convertDate(date)} />
            <img className={styles.previewImg} src={imgSrc} alt="News picture" />
            <div className={styles.newsArticle__Text}>
                <h2>{title}</h2>
                <p className={cn(styles.shortInfo, "Light")}>
                    {shortInfo}
                    <a className={styles.readMoreLink}> Читать дальше</a>
                </p>
                <div className={styles.tagsWrapper}>
                    {tags.map(tag => <div className={cn(styles.tag, 'Regular')} key={tag._id}>{tag.name}</div>)}
                </div>
            </div>
        </article>
    )
}

export default CondensedNews;