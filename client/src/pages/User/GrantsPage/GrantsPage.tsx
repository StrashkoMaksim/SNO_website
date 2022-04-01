import styles from './GrantsPage.module.scss'
import scholarship from "../../../assets/img/scholarship.svg"
import Grant from "../../../components/Grant/Grant"
import DocumentsSection from '../../../components/DocumentsSection/DocumentsSection'
import { useEffect, useState } from 'react'
import http from "../../../assets/http-config";

const GrantsPage = () => {

    const [documents, setDocuments] = useState<any[]>([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            const response = await http.get(`/grants-document`)
            return response;
        }

        fetchDocuments()
            .then(response => {
                if (response.status === 200) {
                    setDocuments(response.data)
                }
            })

        window.scroll(0, 0)

    }, [])

    const mockGrant = {
        achievement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
        points: 20,
        extraInfo: 'Какой то комментарий'
    }

    const grants = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

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