import styles from './DocumentsSection.module.scss'
import React, { FC, useState } from 'react'
import Document from "../Document/Document"
import editIcon from "../../assets/img/editTextIcon.svg"
import deleteIcon from "../../assets/img/xMark.svg"
import { DocumentsAction, IDocument } from '../../types/document'
import AdminAddDocumentModal from '../../pages/Admin/AdminDocumentsPage/AdminAddDocumentModal/AdminAddDocumentModal'
import { useActions } from '../../hooks/useActions'
import { Dispatch } from 'redux'
import { AxiosResponse } from 'axios'
import { style } from '@mui/system'

interface DocumentsSectionProps {
    title: string,
    documents: IDocument[],
    id?: string,
    editTitle?: (title: string, id: string) => void,
    isAdmin?: boolean,
    deleteCategory?: (id: string) => void
    deleteDocument?: (sectionId: string, docNumber: number) => void
    deleteDocumentById?: (id: string) => void
    updateData?: () => void
    addDocument?: (document: any) => void
}

const DocumentsSection: FC<DocumentsSectionProps> = ({ title, id, documents, editTitle, isAdmin = false, deleteCategory, deleteDocument, deleteDocumentById, updateData, addDocument }) => {

    const [modalOpened, setModalOpened] = useState<boolean>(false)

    const { addDocumentToDocumentCategory } = useActions()

    const openModal = () => {
        setModalOpened(true)
    }

    const closeModal = () => {
        setModalOpened(false)
    }

    const editSectionTitle = () => {
        if (editTitle && id) editTitle(title, id)
    }

    const deleteThisCategory = () => {
        if (deleteCategory && id) deleteCategory(id)
    }

    const deleteDoc = (docNumber: number) => {
        if (deleteDocument && id) deleteDocument(id, docNumber)
    }

    const deleteDocById = (id: string) => {
        if (deleteDocumentById) deleteDocumentById(id)
    }

    const addDocumentToCategory = async (document: any) => {
        const fd = new FormData();
        fd.set('name', document.name)
        fd.set('link', document.link)
        fd.set('file', document.file)
        let response: (dispatch: Dispatch<DocumentsAction>) => Promise<AxiosResponse | undefined>
        if (id) {
            response = await addDocumentToDocumentCategory(id, fd)

            // @ts-ignore
            if (response && response.status !== 200) {
                // @ts-ignore
                alert(response.data.message)
            }

        }
        if (updateData) updateData();
        closeModal()
    }

    return (
        <section className={styles.Documents}>

            <AdminAddDocumentModal closeModal={closeModal} modalOpened={modalOpened} onSubmit={addDocument ? addDocument : addDocumentToCategory} />

            <div className={styles.Documents__TitleBlock}>
                <h2 className={styles.title}>{title}</h2>
                {editTitle && <button className={styles.editBtn} onClick={editSectionTitle}>
                    <img src={editIcon} alt="" />
                </button>}
                {deleteCategory &&
                    <button className={styles.deleteBtn}
                        onClick={deleteThisCategory}
                    >Удалить категорию</button>}
            </div>

            <div className={styles.Documents__Grid}>
                {documents?.map((doc, index) =>
                    <div
                        key={doc._id}
                        className={styles.docWithDeleteBtn}
                    >
                        <Document
                            _id={doc._id}
                            type={doc.type}
                            name={doc.name}
                            link={doc.link}
                        />
                        {(deleteDocument || deleteDocumentById) && <button
                            onClick={deleteDocument ? () => deleteDoc(index) : () => deleteDocById(doc._id)}
                            className={styles.deleteDocBtn}>
                            <img src={deleteIcon}></img>
                        </button>}
                    </div>
                )}
                {isAdmin && <button className={styles.addDocBtn} onClick={openModal}>Добавить документ</button>}
            </div>

        </section>
    )
}

export default DocumentsSection;