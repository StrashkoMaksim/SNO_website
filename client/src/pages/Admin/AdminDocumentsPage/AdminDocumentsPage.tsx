import { FC, useEffect, useState } from 'react'
import plusIcon from "../../../assets/img/plus.svg"
import AdminFormInputText, { AFITStyle } from '../../../components/Admin/AdminFormInputText/AdminFormInputText';
import DefaultButton, { ButtonStyles, ButtonTypes } from "../../../components/DefaultButton/DefaultButton";
import DocumentsSection from "../../../components/DocumentsSection/DocumentsSection";
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { DocumentCategory, EmptyDocumentCategory } from '../../../types/document';
import AdminAddCategoryModal from './AdminAddCategoryModal/AdminAddCategoryModal';
import styles from "./AdminDocumentsPage.module.scss"

const AdminDocumentsPage: FC = () => {
    const { documents } = useTypedSelector(state => state.documents)
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const { fetchDocumentCategories, deleteDocumentCategory, deleteDocumentFromDocumentCategory } = useActions()
    const [editableCategory, setEditableCategory] = useState<DocumentCategory>(EmptyDocumentCategory)

    useEffect(() => {
        fetchDocumentCategories()
    }, [])

    const triggerDataFetch = () => setTimeout(() => fetchDocumentCategories(), 300)

    const openModal = (title?: string, id?: string) => {
        setIsModalVisible(true)
        if (title && id) setEditableCategory({ ...editableCategory, _id: id, title: title, documents: [] })
    }

    const closeModal = () => {
        setIsModalVisible(false)
        setEditableCategory(EmptyDocumentCategory)
    }

    const deleteCategory = (id: string) => {
        deleteDocumentCategory(id)
        triggerDataFetch()
    }

    const deleteDocument = (id: string, docNumber: number) => {
        deleteDocumentFromDocumentCategory(id, docNumber)
        triggerDataFetch()
    }

    return (
        <>
            <header className="adminHeader">
                <h1 className="adminH1">Документы</h1>
                <div className="btns">
                    <DefaultButton
                        text={'Добавить категорию'}
                        imgSrc={plusIcon}
                        style={ButtonStyles.adminFilled}
                        type={ButtonTypes.button}
                        onClick={() => openModal()}
                    />
                </div>
            </header>
            <AdminAddCategoryModal
                title={editableCategory.title}
                modalOpened={isModalVisible}
                reload={triggerDataFetch}
                closeModal={closeModal}
                id={editableCategory._id}
            />
            {documents.map((category) =>
                <DocumentsSection
                    key={category._id}
                    editTitle={openModal}
                    deleteCategory={deleteCategory}
                    title={category.title}
                    id={category._id}
                    documents={category.documents}
                    updateData={triggerDataFetch}
                    deleteDocument={deleteDocument}
                    isAdmin
                />)
            }
        </>
    )
}

export default AdminDocumentsPage