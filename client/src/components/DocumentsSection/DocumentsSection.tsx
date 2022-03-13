import styles from './DocumentsSection.module.scss'
import React, { FC } from 'react'
import Document from "../Document/Document"

interface DocumentsSectionProps {
    title: string,
    documents: {
        _id: string,
        type: string,
        name: string,
        link: string,
    }[]
}

const DocumentsSection: FC<DocumentsSectionProps> = ({ title, documents }) => {

    return (
        <section className={styles.Documents}>
            <h2 className={styles.Documents__Title}>{title}</h2>

            <div className={styles.Documents__Grid}>
                {documents.map(doc =>
                    <Document
                        key={doc._id}
                        _id={doc._id}
                        type={doc.type}
                        name={doc.name}
                        link={doc.link}
                    />
                )}
            </div>

        </section>
    )
}

export default DocumentsSection;