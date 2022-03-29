import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import styles from './NewsFull.module.scss'
import cn from 'classnames'
import ParsedEditor from '../../ParsedEditor/ParsedEditor'
import InfoLabel from '../../InfoLabel/InfoLabel'

const NewsFull = () => {
    const { id: newsId } = useParams()
    const { news } = useTypedSelector(state => state.news)
    const { fetchNewsDetail } = useActions()

    useEffect(() => {
        if (newsId) fetchNewsDetail(newsId)
        window.scrollTo(0, 0)
    }, [newsId])

    // Переводит дату из серверного timestamp в читаемый вид
    const convertDate = (date: string) => {
        return date
            ?.slice(0, 10)
            .split('-')
            .reverse()
            .join('/')
    }

    return (
        <>
            <section className={'section'}>
                <div className={cn('container', styles.News)}>
                    <section className={styles.News__MainInfo}>
                        <InfoLabel text={convertDate(news[0]?.date)} />
                        <div className={styles.News__MainInfo__Head}>
                            <p className={styles.Title}>{news[0]?.title}</p>
                            <div className={styles.tagsWrapper}>
                                {news[0]?.tags.map(tag => <Link to={`/news/all?tag=${tag._id}`} className={cn(styles.tag, 'Regular')} key={tag._id}>{tag.name}</Link>)}
                            </div>
                            <p className={styles.previewText}>{news[0]?.previewText}</p>
                        </div>

                        <ParsedEditor content={news[0]?.content} />

                    </section>
                    <aside className={styles.News__OtherNews}>
                        <p className={styles.News__OtherNews__Header}>другие новости</p>
                        {news.map(article => {
                            if (article._id !== news[0]._id)
                                return <Link key={article._id} className={styles.otherNewsSingle} to={'/news/' + article._id}>
                                    <img src={`${process.env.REACT_APP_SERVER_URL}/${article.previewImg}`} alt="" />
                                    <p>{article.title}</p>
                                </Link>
                        }
                        )}
                    </aside>

                </div>
            </section >
        </>
    )
}

export default NewsFull