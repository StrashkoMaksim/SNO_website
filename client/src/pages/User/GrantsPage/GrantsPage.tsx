import styles from './GrantsPage.module.scss'
import scholarship from "../../../assets/img/scholarship.svg"
import Grant from "../../../components/Grant/Grant"
import DocumentsSection from '../../../components/DocumentsSection/DocumentsSection'

const GrantsPage = () => {

    const mockGrant = {
        achievement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
        points: 20,
        extraInfo: 'Какой то комментарий'
    }

    const grants = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    const documents = [
        {
            "_id": "621336d3e03d4ac0b87cef8b",
            "type": "link",
            "name": "Правила оказания медицинских услуг в Обществе с ограниченной ответственностью «Скандинавский Центр Здоровья»",
            "link": "https://www.google.com/search?q=%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D1%82%D1%87%D0%B8%D0%BA&oq=%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D1%82%D1%87%D0%B8%D0%BA&aqs=chrome..69i57j0i10i131i433l2j0i10j0i10i433j0i10i131i433l4j0i10.2946j0j7&sourceid=chrome&ie=UTF-8",
            "__v": 0
        },
        {
            "_id": "621336d3e03d4ac0b87cef8b",
            "type": "doc",
            "name": "Политика в отношении обработки персональных данных",
            "link": "https://www.google.com/search?q=%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D1%82%D1%87%D0%B8%D0%BA&oq=%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D1%82%D1%87%D0%B8%D0%BA&aqs=chrome..69i57j0i10i131i433l2j0i10j0i10i433j0i10i131i433l4j0i10.2946j0j7&sourceid=chrome&ie=UTF-8",
            "__v": 0
        },
        {
            "_id": "621336d3e03d4ac0b87cef8b",
            "type": "pdf",
            "name": "Специальная оценка условий труда",
            "link": "https://www.google.com/search?q=%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D1%82%D1%87%D0%B8%D0%BA&oq=%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D1%82%D1%87%D0%B8%D0%BA&aqs=chrome..69i57j0i10i131i433l2j0i10j0i10i433j0i10i131i433l4j0i10.2946j0j7&sourceid=chrome&ie=UTF-8",
            "__v": 0
        },
        {
            "_id": "621336d3e03d4ac0b87cef8b",
            "type": "link",
            "name": "Свидетельство о постановке на учет в налоговый орган",
            "link": "https://www.google.com/search?q=%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D1%82%D1%87%D0%B8%D0%BA&oq=%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D1%82%D1%87%D0%B8%D0%BA&aqs=chrome..69i57j0i10i131i433l2j0i10j0i10i433j0i10i131i433l4j0i10.2946j0j7&sourceid=chrome&ie=UTF-8",
            "__v": 0
        },
    ]

    return (

        < section className={'section'} >
            <div className={'container'}>
                <h1>Повышенная стипендия</h1>

                <div className={styles.GrantsInfo}>
                    <img src={scholarship} alt="registration icon" />
                    <p className={styles.Regular}>На каждый семестр формируется фонд повышенной стипендии для всех студентов ДВГУПС.
                        Кандидатом на повышенную стипендию может стать любой! Получатели такой стипендии выбираются на конкурсной основе по общему
                        числу баллов из таблицы ниже.</p>
                </div>

                <div className={styles.Grants}>
                    <div className={styles.tableTitles}>
                        <span>Достижение</span>
                        <span>Кол-во баллов</span>
                        <span>Дополнительно</span>
                    </div>
                    {grants.map(grant =>
                        <Grant
                            achievement={mockGrant.achievement}
                            bonusPoints={mockGrant.points}
                            extraInfo={mockGrant.extraInfo}
                        />)}
                </div>

                <DocumentsSection title='Документы' documents={documents} />

            </div>
        </ section>
    )
}

export default GrantsPage;