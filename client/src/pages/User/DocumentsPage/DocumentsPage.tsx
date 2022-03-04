import DocumentsSection from "../../../components/DocumentsSection/DocumentsSection";
import styles from "./DocumentsPage.module.scss"

const DocumentsPage = () => {

    const sectionsWithDocuments = [
        {
            "_id": "62130d1325785bd12a878a8b",
            "title": "Для студентов",
            "documents": [
                {
                    "_id": "621336d3e03d4ac0b87cef8b",
                    "type": "link",
                    "name": "Закон РФ от 07.02.1992 N 2300-1 «О защите прав потребителей»",
                    "link": "https://www.google.com/search?q=%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D1%82%D1%87%D0%B8%D0%BA&oq=%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D1%82%D1%87%D0%B8%D0%BA&aqs=chrome..69i57j0i10i131i433l2j0i10j0i10i433j0i10i131i433l4j0i10.2946j0j7&sourceid=chrome&ie=UTF-8",
                    "__v": 0
                },
                {
                    "_id": "621336d3e03d4ac0b87cef8b",
                    "type": "link",
                    "name": "Федеральный закон от 21.11.2011 N 323-ФЗ «Об основах охраны здоровья граждан в Российской Федерации»",
                    "link": "https://www.google.com/search?q=%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D1%82%D1%87%D0%B8%D0%BA&oq=%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D1%82%D1%87%D0%B8%D0%BA&aqs=chrome..69i57j0i10i131i433l2j0i10j0i10i433j0i10i131i433l4j0i10.2946j0j7&sourceid=chrome&ie=UTF-8",
                    "__v": 0
                },
                {
                    "_id": "621336d3e03d4ac0b87cef8b",
                    "type": "docx",
                    "name": "Приказ МинЗдрава РФ от 23 апреля 2012 г. № 390н «Об утверждении перечня определенных видов медицинских вмешательств, на которые граждане дают информированное добровольное согласие при выборе врача и медицинской организации»",
                    "link": "https://www.google.com/search?q=%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D1%82%D1%87%D0%B8%D0%BA&oq=%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D1%82%D1%87%D0%B8%D0%BA&aqs=chrome..69i57j0i10i131i433l2j0i10j0i10i433j0i10i131i433l4j0i10.2946j0j7&sourceid=chrome&ie=UTF-8",
                    "__v": 0
                },
                {
                    "_id": "621336d3e03d4ac0b87cef8b",
                    "type": "pdf",
                    "name": "Приказ Министерства Здравоохранения РФ от 20 декабря 2012 г. №1177н «Об утверждении порядка дачи информированного добровольного согласия на медицинское вмешательство и отказа от медицинского вмешательства в отношении определенных видов медицинских вмешательств, форм информированного добровольного согласия на медицинское вмешательство и форм отказа от медицинского вмешательства",
                    "link": "https://www.google.com/search?q=%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D1%82%D1%87%D0%B8%D0%BA&oq=%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D1%82%D1%87%D0%B8%D0%BA&aqs=chrome..69i57j0i10i131i433l2j0i10j0i10i433j0i10i131i433l4j0i10.2946j0j7&sourceid=chrome&ie=UTF-8",
                    "__v": 0
                },
                {
                    "_id": "621336d3e03d4ac0b87cef8b",
                    "type": "pdf",
                    "name": "Постановление правительства РФ от 4 октября 2012 г. №1006 «Об утверждении правил предоставления медицинскими организациями платных медицинских услуг",
                    "link": "https://www.google.com/search?q=%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D1%82%D1%87%D0%B8%D0%BA&oq=%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D1%82%D1%87%D0%B8%D0%BA&aqs=chrome..69i57j0i10i131i433l2j0i10j0i10i433j0i10i131i433l4j0i10.2946j0j7&sourceid=chrome&ie=UTF-8",
                    "__v": 0
                },
                {
                    "_id": "621336d3e03d4ac0b87cef8b",
                    "type": "pdf",
                    "name": "Приказ Минздрава России от 20.06.2013 N 388н (ред. от 21.02.2020) Об утверждении Порядка оказания скорой, в том числе скорой специализированной, медицинской помощи (Зарегистрировано в Минюсте России 16.08.2013 N 29422)",
                    "link": "https://www.google.com/search?q=%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D1%82%D1%87%D0%B8%D0%BA&oq=%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D1%82%D1%87%D0%B8%D0%BA&aqs=chrome..69i57j0i10i131i433l2j0i10j0i10i433j0i10i131i433l4j0i10.2946j0j7&sourceid=chrome&ie=UTF-8",
                    "__v": 0
                },
            ],
        },
        {
            "_id": "62130d1325785bd12a878a8b",
            "title": "Для руководителей",
            "documents": [
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
            ],
        }
    ]

    return (
        <section className={'section'}>
            <div className={'container'}>
                <h1>Документы</h1>

                <div className={styles.documentSections}>
                    {sectionsWithDocuments.map(section =>
                        <DocumentsSection
                            key={section._id}
                            title={section.title}
                            documents={section.documents} />
                    )}
                </div>

            </div>
        </section>
    )
}

export default DocumentsPage;
