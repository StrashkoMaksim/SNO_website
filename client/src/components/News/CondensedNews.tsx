import React, { FC, useEffect, useState } from 'react';
import styles from "./CondensedNews.module.scss"
import cn from "classnames"

interface CondensedNewsProps {
    imgSrc: string,
    title: string,
    shortInfo: string,
    tags: any[],
    date: string
}


const CondensedNews: FC<CondensedNewsProps> = ({ imgSrc, title, shortInfo, tags, date }) => {
    return (
        <article className={styles.newsArticle}>
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