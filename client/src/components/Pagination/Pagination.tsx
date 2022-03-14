import React, {FC, useEffect, useState} from 'react';
import styles from "../News/NewsWithPagination/NewsWithPagination.module.scss";
import doubleArrow from "../../assets/img/doubleArrow.svg";
import singleArrow from "../../assets/img/singleArrow.svg";
import cn from "classnames";

interface PaginationProps {
    totalCount: number
    visibleCount: number
    currentPage: number
    setCurrentPage: (page: number) => void
}

const Pagination = React.memo<PaginationProps>(({ totalCount, visibleCount, currentPage, setCurrentPage }) => {
    const [visiblePages, setVisiblePages] = useState<number[]>([])
    const [pagesCount, setPagesCount] = useState<number>(1)

    useEffect(() => {
        if (totalCount !== 0) {
            setPagesCount(Math.ceil(totalCount / visibleCount))
        } else {
            setPagesCount(0)
        }
    }, [totalCount])

    useEffect(() => {
        if (pagesCount > 2) {
            switch (currentPage) {
                case 1:
                case 2:
                {
                    setVisiblePages([1, 2, 3])
                    break
                }
                case pagesCount:
                case (pagesCount - 1):
                {
                    setVisiblePages([pagesCount - 2, pagesCount - 1, pagesCount])
                    break
                }
                default: {
                    setVisiblePages([currentPage - 1, currentPage, currentPage + 1])
                }
            }
        } else if (pagesCount === 2) {
            setVisiblePages([1, 2])
        } else {
            setVisiblePages([1])
        }
    }, [pagesCount])

    const changeCurrentPage = (newPage: number) => {
        return () => {
            if (newPage >= 1 && newPage <= pagesCount) {
                setCurrentPage(newPage)
            }
        }
    }

    return (
        <>
            {pagesCount > 0 &&
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
                        className={cn(styles.pagination__btn, { [styles['pagination__btn-currentPage']]: currentPage === visiblePages[0] })}
                        onClick={changeCurrentPage(visiblePages[0])}
                    >
                        {visiblePages[0]}
                    </button>
                    {visiblePages[1] &&
                        <button
                            type='button'
                            className={cn(styles.pagination__btn, {[styles['pagination__btn-currentPage']]: currentPage === visiblePages[1]})}
                            onClick={changeCurrentPage(visiblePages[1])}

                        >
                            {visiblePages[1]}
                        </button>
                    }
                    {visiblePages[2] &&
                        <button
                            type='button'
                            className={cn(styles.pagination__btn, { [styles['pagination__btn-currentPage']]: currentPage === visiblePages[2] })}
                            onClick={changeCurrentPage(visiblePages[2])}
                        >
                            {visiblePages[2]}
                        </button>
                    }
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
                        onClick={changeCurrentPage(pagesCount)}
                    >
                        <img src={doubleArrow} className={styles.mirroredArrow} alt="" />
                    </button>
                </div>
            }
        </>
    )
})

export default Pagination