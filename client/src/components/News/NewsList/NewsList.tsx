import React, { FC, useEffect } from 'react';
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import NewsPreview from "../NewsPreview/NewsPreview";
import styles from "./NewsList.module.scss"
import NewsSkeleton from '../NewsSkeleton/NewsSkeleton';

interface NewsList {
    count: number
    page: number
    isAdmin?: true
}

const NewsList: FC<NewsList> = ({ count, page, isAdmin }) => {
    const { news, loading } = useTypedSelector(state => state.news)
    const { fetchNewsPreviews } = useActions()


    useEffect(() => {
        fetchNewsPreviews(page, count)
    }, [])

    return (
        <div className={styles.newsList}>

            {loading ? <>
                <NewsSkeleton />
                <NewsSkeleton />
                <NewsSkeleton />
                <NewsSkeleton />
            </> :
                <>
                    {
                        news.length > 0 ? news.map(article =>
                            <NewsPreview
                                id={article._id}
                                key={article._id}
                                imgSrc={article.previewImg}
                                title={article.title}
                                shortInfo={article.previewText}
                                tags={article.tags}
                                date={article.date}
                                isAdmin={isAdmin}
                            />
                        ) : <p>Новостей нет в базе</p>
                    }
                </>
            }
        </div>
    );
};

export default NewsList;