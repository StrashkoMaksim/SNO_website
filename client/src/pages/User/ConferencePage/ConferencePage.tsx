import DocumentsSection from "../../../components/DocumentsSection/DocumentsSection";
import styles from "./ConferencePage.module.scss"
import mockImg from "../../../assets/img/mockConference.png"
import { useEffect } from "react";

const ConferencePage = () => {

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

    useEffect(() => window.scroll(0, 0), [])

    return (
        <section className={'section'}>
            <div className={'container'}>
                <h1>Студенческая конференция</h1>

                <section className={styles.Conference}>
                    <img className={styles.Conference__Banner} src={mockImg} alt="Conference baner" />
                    <div className={styles.Conference__Content}>
                        <p>Несколько строк описания Несколько строк описания Несколько строк описания
                            Несколько строк описания Несколько строк описания Несколько строк описания
                            Несколько строк описания Несколько строк описания Несколько строк описания
                            Несколько строк описания Несколько строк описания Несколько строк описания </p>
                    </div>
                </section>

                <DocumentsSection title="Документы" documents={documents} />
            </div>
        </section>
    )
}

export default ConferencePage;