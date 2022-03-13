import React, { FC } from "react";
import cn from "classnames"
import styles from "./NewsBlock.module.scss"
import NewsList from "../NewsList/NewsList";
import LinkButton from "../../LinkButton/LinkButton";

interface NewsBlockProps {
    count: number
    page: number
}

const NewsBlock: FC<NewsBlockProps> = ({ count, page }) => {
    return (
        <section className={cn('section')}>
            <div className={cn('container')}>
                <h1>Новости</h1>
                <NewsList count={4} page={1} />
                <div className={styles.buttonWrapper}>
                    <LinkButton
                        text="Все новости"
                        to="/news/all" />
                </div>
            </div>
        </section >
    )
}

export default NewsBlock;