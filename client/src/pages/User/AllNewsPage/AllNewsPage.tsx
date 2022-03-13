import styles from './AllNewsPage.module.scss'
import cn from 'classnames';
import NewsWithPagination from '../../../components/News/NewsWithPagination/NewsWithPagination';

const AllNewsPage = () => {

    return (
        <section className={cn('section', styles.AllNewsPage)}>
            <div className={'container'}>
                <h1>Новости</h1>
                <NewsWithPagination />
            </div>
        </section>
    )
}

export default AllNewsPage;