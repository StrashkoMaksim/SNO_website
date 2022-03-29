import React, { FC, useEffect } from 'react';
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useActions";
import NewsPreview from "../NewsPreview/NewsPreview";
import styles from "./NewsList.module.scss"
import NewsSkeleton from '../NewsSkeleton/NewsSkeleton';
import emptyIcon from '../../../assets/img/emptyIcon.svg'

interface NewsList {
    count: number
    page: number
    tagId?: string | undefined
    searchValue?: string | undefined
    isAdmin?: boolean
}

const NewsList: FC<NewsList> = ({ count, page, tagId, searchValue, isAdmin }) => {
    const { news, loading } = useTypedSelector(state => state.news)
    const { fetchNewsPreviews } = useActions()


    useEffect(() => {
        fetchNewsPreviews(page, count, tagId, searchValue)
    }, [page, tagId, searchValue])

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
                        )
                            :
                            <div className={styles.notFound}>
                                <img src={emptyIcon} alt="" />
                                <p>К сожалению, по вашему запросу ничего не найдено. Проверьте правильность ввода или попробуйте изменить запрос.</p>
                            </div>
                    }
                </>
            }
        </div>
    );
};

export default NewsList;