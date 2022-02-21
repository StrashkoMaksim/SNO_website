import React, { FC } from 'react';

interface CondensedNewsProps {
    imgSrc: string,
    title: string,
    shortInfo: string,
    tags: string[],
    date: string
}


const CondensedNews: FC<CondensedNewsProps> = ({ imgSrc, title, shortInfo, tags, date }) => {

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