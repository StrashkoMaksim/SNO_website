import styles from './NewsSkeleton.module.scss'
import placeholderImg from '../../../assets/img/placeholderImg-Gray.svg'

const NewsSkeleton = () => {
    return (
        <div className={styles.newsSkeleton}>
            <img src={placeholderImg} alt="" className={styles.newsSkeleton__img} />
            <div className={styles.newsSkeleton__TextBlock}>
                <div className={styles.newsSkeleton__text} id={styles.title} />
                <div className={styles.newsSkeleton__text} />
                <div className={styles.newsSkeleton__text} />
                <div className={styles.newsSkeleton__text} />
            </div>

            <div className={styles.newsSkeleton__Tags}>
                <div className={styles.tag} />
                <div className={styles.tag} />
                <div className={styles.tag} />
                <div className={styles.tag} />
            </div>
        </div>
    )
}

export default NewsSkeleton