import React, { FC, useEffect } from 'react';
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { fetchNewsPreviews } from "../../../store/action-creators/news";
import { useActions } from "../../../hooks/useActions";

const NewsPage: FC = () => {
    const { news, error, loading } = useTypedSelector(state => state.news)
    const { fetchNewsPreviews } = useActions()

    useEffect(() => {
        fetchNewsPreviews(1, 10)
        window.scroll(0, 0)

    }, [])

    return (
        <div>
            {news.map(newsEl => {
                return (
                    <div>
                        {newsEl.date}
                    </div>
                )
            })}
        </div>
    );
};

export default NewsPage;