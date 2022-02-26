import React, {FC, useEffect} from 'react';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useActions} from "../../../hooks/useActions";
import NewsPreview from "../NewsPreview/NewsPreview";
import styles from "./NewsList.module.scss"

interface NewsList {
    count: number
    page: number
}

const NewsList: FC<NewsList> = ({ count, page }) => {
    const { news } = useTypedSelector(state => state.news)
    const { fetchNewsPreviews } = useActions()

    useEffect(() => {
        fetchNewsPreviews(1, 4)
    }, [])

    return (
        <div className={styles.newsList}>
            {news.length > 0 ? news.map(article =>
                <NewsPreview
                    id={article._id}
                    key={article._id}
                    imgSrc={article.previewImg}
                    title={article.title}
                    shortInfo={article.previewText}
                    tags={article.tags}
                    date={article.date}
                />
            ) : <p>Новостей нет в базе</p>}
        </div>
    );
};

export default NewsList;