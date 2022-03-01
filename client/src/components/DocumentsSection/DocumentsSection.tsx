import styles from './DocumentsSection.module.scss'
import docIcon from '../../assets/img/docIcon.svg'
import pdfIcon from '../../assets/img/pdfIcon.svg'
import ellipse from '../../assets/img/ellipse.svg'
import cn from 'classnames'
import React, { FC } from 'react'

interface DocumentsSectionProps {
    title: string,
    documents: {
        _id: string,
        type: string,
        name: string,
        link: string,
        __v?: number    //Что такое __v?
    }[]
}

const DocumentsSection: FC<DocumentsSectionProps> = ({ title, documents }) => {

    return (
        <section className={styles.Documents}>
            <h2 className={styles.Documents__Title}>{title}</h2>

            <div className={styles.Documents__Grid}>
                {documents.map(doc =>
                    <div key={doc._id} className={styles.Documents__Single}>
                        <img className={styles.linkImg}
                            src={doc.type === 'link' ? ellipse
                                : doc.type === 'pdf' ? pdfIcon : docIcon} alt="" />
                        <a className={styles.DocLink} href={doc.link}>{doc.name}</a>
                    </div>
                )}
            </div>

        </section>
    )
}

export default DocumentsSection;