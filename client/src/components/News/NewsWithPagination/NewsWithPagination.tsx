import styles from './NewsWithPagination.module.scss'
import searchIcon from '../../../assets/img/search.svg'
import singleArrow from '../../../assets/img/singleArrow.svg'
import NewsList from '../../../components/News/NewsList/NewsList';
import cn from 'classnames';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';
import { FormEvent, useEffect, useState } from 'react';
import Pagination from "../../Pagination/Pagination";

type Tag = {
    _id: string | undefined
    name: string
}

const defaultTag = {
    _id: undefined,
    name: 'Все теги'
}

const NEWS_COUNT = 4

const NewsWithPagination = () => {
    const { tags } = useTypedSelector(state => state.tag)
    const { fetchTags } = useActions()
    const { count } = useTypedSelector(state => state.news)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [currentTag, setCurrentTag] = useState<Tag>(defaultTag)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [tagsSelectorOpened, setTagsSelectorOpened] = useState<boolean>(false);

    useEffect(() => {
        fetchTags()
    }, [])

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tagIdFromQuery = params.get('tag');
        const searchStringQuery = params.get('search');
        if (tagIdFromQuery) {
            const tagName = tags.filter(tag => tag._id === tagIdFromQuery)[0]?.name
            if (tagName) setCurrentTag({ _id: tagIdFromQuery, name: tagName })
        }
        if (searchStringQuery) setSearchQuery(searchQuery)
        window.addEventListener('popstate', function (event) {
            console.log('changed')
        });
    }, [])



    const changeCurrentTag = (tagId: string | undefined, name: string) => {
        return () => {
            setTagsSelectorOpened(false)
            setCurrentPage(1)
            setCurrentTag({ _id: tagId, name: name })
        }
    }

    const onSearchBarChange = (event: FormEvent<HTMLInputElement>) => {
        setCurrentPage(1)
        setSearchQuery(event.currentTarget.value)
    }

    const toggleTagsSelectorOpened = () => {
        setTagsSelectorOpened(!tagsSelectorOpened)
    }

    return (
        <div className={styles.NewsWithPaginaton}>
            <div className={styles.filterActions}>
                <div
                    className={styles.filterActions__Action}>
                    <img src={searchIcon} alt="" />
                    <input
                        type="search"
                        className={styles.SearchBar}
                        placeholder="Поиск новости"
                        value={searchQuery}
                        onChange={onSearchBarChange}
                    />
                </div>
                <div
                    className={cn(styles.filterActions__Action, styles.tagsSelector,
                        { [styles['tagsSelector-active']]: tagsSelectorOpened })}>

                    <div
                        className={styles.filterActions__Action__SelectTag}
                        onClick={toggleTagsSelectorOpened}
                    >
                        <p>{currentTag.name}</p>
                        <img src={singleArrow} alt="" />
                    </div>

                    <div className={cn(styles.filterActions__Action__Modal,
                        styles.tagsSelector__Modal,
                        { [styles['tagsSelector__Modal-active']]: tagsSelectorOpened })}
                    >
                        <div className={styles.tagWrapper} onClick={changeCurrentTag(defaultTag._id, defaultTag.name)}>
                            <p className={styles.tag} >Все теги</p>
                        </div>
                        {tags.map(tag =>
                            <div className={styles.tagWrapper} key={tag._id} onClick={changeCurrentTag(tag._id, tag.name)}>
                                <p className={styles.tag} >
                                    {tag.name}
                                </p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <NewsList count={NEWS_COUNT} page={currentPage} tagId={currentTag._id} searchValue={searchQuery} />
            <Pagination totalCount={count} visibleCount={NEWS_COUNT} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div >
    )
}

export default NewsWithPagination