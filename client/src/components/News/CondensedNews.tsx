import React, {FC, useEffect, useState} from 'react';
import axios from "axios";

interface CondensedNewsProps {
    imgSrc: string,
    title: string,
    shortInfo: string,
    tags: string[],
    date: string
}


const CondensedNews: FC<CondensedNewsProps> = ({ imgSrc, title, shortInfo, tags, date }) => {
    const [news, setNews] = useState([])

    useEffect(() => {
        const fetchNews = async () => {
            const response = await axios.get(`${process.env.serverURL}/api/news?page=1&count=4`)

            if (response.status === 200) {
                setNews(news)
            }
        }

        fetchNews()
    }, [])

    return (
        <article>
            <img src={imgSrc} alt="News picture" />
            <h2>{title}</h2>
            <p>
                {shortInfo}
                <a>Читать дальше</a>
            </p>
            <div>
                {tags.map(tag => <div>{tag}</div>)}
            </div>
        </article>
    )
}

export default CondensedNews;