import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import styles from './NewsFull.module.scss'
import cn from 'classnames'
import ParsedEditor from '../../ParsedEditor/ParsedEditor'

const NewsFull = () => {
    const { id: newsId } = useParams()
    const { news } = useTypedSelector(state => state.news)
    const { fetchNewsDetail } = useActions()

    useEffect(() => {
        if (newsId) fetchNewsDetail(newsId)
        console.log(news)
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <section className={'section'}>
                <div className={cn('container', styles.News)}>
                    <section className={styles.News__MainInfo}>

                        <div className={styles.News__MainInfo__Head}>
                            <p className={styles.Title}>{news[0]?.title}</p>
                            {/* Теги */}
                            <p className={styles.previewText}>{news[0]?.previewText}</p>
                        </div>

                        <ParsedEditor content={news[0]?.content} />

                    </section>
                    <aside className={styles.News__OtherNews}>
                        {/* другие новости */}
                    </aside>

                </div>
            </section >
        </>
    )
}

export default NewsFull