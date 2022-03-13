import styles from './NewsWithPagination.module.scss'
import searchIcon from '../../../assets/img/search.svg'
import singleArrow from '../../../assets/img/singleArrow.svg'
import doubleArrow from '../../../assets/img/doubleArrow.svg'
import NewsList from '../../../components/News/NewsList/NewsList';
import cn from 'classnames';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';
import { FormEvent, useEffect, useState } from 'react';

type Tag = {
    _id: string | undefined
    name: string
}

const defaultTag = {
    _id: undefined,
    name: 'Все теги'
}

const NewsWithPagination = () => {

    const { tags } = useTypedSelector(state => state.tag)
    const { fetchTags } = useActions()

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentTag, setCurrentTag] = useState<Tag>(defaultTag)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [visiblePages, setVisiblePages] = useState<number[]>([1, 2, 3])

    const totalPagesCount = 10;

    const [tagsSelectorOpened, setTagsSelectorOpened] = useState<boolean>(false);

    const toggleTagsSelectorOpened = () => {
        setTagsSelectorOpened(!tagsSelectorOpened)
    }

    useEffect(() => {
        fetchTags()
    }, [])

    useEffect(() => {
        switch (currentPage) {
            case 1:
            case 2:
                {
                    setVisiblePages([1, 2, 3])
                    break
                }
            case totalPagesCount:
            case (totalPagesCount - 1):
                {
                    setVisiblePages([totalPagesCount - 2, totalPagesCount - 1, totalPagesCount])
                    break
                }
            default: {
                setVisiblePages([currentPage - 1, currentPage, currentPage + 1])
            }
        }
    }, [currentPage])

    const changeCurrentPage = (newPage: number) => {
        return () => {
            if (newPage >= 1 && newPage <= totalPagesCount) {
                setCurrentPage(newPage)
            }
        }
    }

    const changeCurrentTag = (tagId: string | undefined, name: string) => {
        return () => setCurrentTag({ _id: tagId, name: name })
    }

    const onSearchBarChange = (event: FormEvent<HTMLInputElement>) => {
        setSearchQuery(event.currentTarget.value)
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
            <NewsList count={4} page={currentPage} tagId={currentTag._id} searchValue={searchQuery} />

            <div className={styles.pagination}>
                <button
                    type='button'
                    className={styles.pagination__btn}
                    onClick={changeCurrentPage(1)}
                >
                    <img src={doubleArrow} alt="" />
                </button>
                <button
                    type='button'
                    className={styles.pagination__btn}
                    onClick={changeCurrentPage(currentPage - 1)}
                >
                    <img src={singleArrow} alt="" />
                </button>
                <button
                    type='button'
                    className={cn(styles.pagination__btn, { [styles['pagination__btn-currentPage']]: currentPage === 1 })}
                    onClick={changeCurrentPage(visiblePages[0])}
                >
                    {visiblePages[0]}
                </button>
                <button
                    type='button'
                    className={cn(styles.pagination__btn, { [styles['pagination__btn-currentPage']]: currentPage !== 1 && currentPage !== totalPagesCount })}
                    onClick={changeCurrentPage(visiblePages[1])}

                >
                    {visiblePages[1]}
                </button>
                <button
                    type='button'
                    className={cn(styles.pagination__btn, { [styles['pagination__btn-currentPage']]: currentPage === totalPagesCount })}
                    onClick={changeCurrentPage(visiblePages[2])}
                >
                    {visiblePages[2]}
                </button>
                <button
                    type='button'
                    className={styles.pagination__btn}
                    onClick={changeCurrentPage(currentPage + 1)}
                >
                    <img src={singleArrow} className={styles.mirroredArrow} alt="" />
                </button>
                <button
                    type='button'
                    className={styles.pagination__btn}
                    onClick={changeCurrentPage(totalPagesCount)}
                >
                    <img src={doubleArrow} className={styles.mirroredArrow} alt="" />
                </button>
            </div>
        </div >
    )
}

export default NewsWithPagination