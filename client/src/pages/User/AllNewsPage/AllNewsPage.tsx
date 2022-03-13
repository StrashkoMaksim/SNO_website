import { useCallback, useEffect, useState } from 'react';
import NewsList from '../../../components/News/NewsList/NewsList';
import styles from './AllNewsPage.module.scss'
import searchIcon from '../../../assets/img/search.svg'
import arrowIcon from '../../../assets/img/arrow.svg'
import cn from 'classnames';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';

const AllNewsPage = () => {

    const { tags } = useTypedSelector(state => state.tag)
    const { loading } = useTypedSelector(state => state.news)
    const { changeNewsState } = useActions()
    const { fetchTags } = useActions()

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentTag, setCurrentTag] = useState<string>('Все темы')

    const [tagsSelectorOpened, setTagsSelectorOpened] = useState<boolean>(false);

    const toggleTagsSelectorOpened = () => {
        setTagsSelectorOpened(!tagsSelectorOpened)
    }

    useEffect(() => {
        fetchTags()
    }, [])

    return (
        <section className={cn('section', styles.AllNewsPage)}>
            <div className={'container'}>
                <h1>Новости</h1>
                <div className={styles.filterActions}>
                    <div
                        className={styles.filterActions__Action}>
                        <img src={searchIcon} alt="" />
                        <input type="search" className={styles.SearchBar} placeholder="Поиск новости" />
                    </div>
                    <div
                        className={cn(styles.filterActions__Action, styles.tagsSelector,
                            { [styles['tagsSelector-active']]: tagsSelectorOpened })}>

                        <div
                            className={styles.filterActions__Action__SelectTag}
                            onClick={toggleTagsSelectorOpened}
                        >
                            <p>{currentTag}</p>
                            <img src={arrowIcon} alt="" />
                        </div>

                        <div className={cn(styles.filterActions__Action__Modal,
                            styles.tagsSelector__Modal,
                            { [styles['tagsSelector__Modal-active']]: tagsSelectorOpened })}>
                            {tags.map(tag =>
                                <p key={tag._id} className={styles.tag}>
                                    {tag.name}
                                </p>
                            )}
                        </div>

                    </div>
                </div>
                <NewsList count={4} page={currentPage} />
            </div>
        </section>
    )
}

export default AllNewsPage;