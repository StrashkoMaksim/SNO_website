import { useEffect } from "react";
import DocumentsSection from "../../../components/DocumentsSection/DocumentsSection";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import styles from "./DocumentsPage.module.scss"

const DocumentsPage = () => {

    const { fetchDocumentCategories } = useActions()
    const { documents } = useTypedSelector(state => state.documents)

    useEffect(() => {
        fetchDocumentCategories()
        window.scroll(0, 0)
    }, [])

    return (
        <section className={'section'}>
            <div className={'container'}>
                <h1>Документы</h1>

                <div className={styles.documentSections}>
                    {documents.map(section =>
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
