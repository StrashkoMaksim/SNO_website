import { FC, FormEvent, useEffect, useState } from 'react'
import AdminFormInputText, { AFITStyle } from '../../../../components/Admin/AdminFormInputText/AdminFormInputText'
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage'
import MakeModal from '../../../../components/MakeModal/MakeModal'
import { useActions } from '../../../../hooks/useActions'
import styles from './AdminAddCategoryModal.module.scss'

interface AACMProps {
    closeModal: () => void,
    modalOpened: boolean,
    reload: () => void,
    title?: string
    id?: string,
}

const AdminAddCategoryModal: FC<AACMProps> = ({ closeModal, modalOpened, reload, title = '', id = '' }) => {
    const [category, setCategory] = useState<string>(title)
    const { addDocumentCategory, updateDocumentCategory } = useActions()
    const [errorMessage, setErrorMessage] = useState<string>('')

    useEffect(() => {
        setCategory(title)
    }, [title])

    const onInputChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCategory(e.currentTarget.value)
    }

    const onButtonClick = () => {
        if (!category) {
            setErrorMessage('Название категории не должно быть пустым')
            setTimeout(() => setErrorMessage(''), 3000)
            return
        }

        id ? updateDocumentCategory(id, category) : addDocumentCategory(category)

        closeModal()
        reload()
    }

    return (
        <MakeModal modalOpened={modalOpened} closeModal={closeModal}>
            <ErrorMessage errMessage={errorMessage} />
            <div className={styles.modal}>
                <AdminFormInputText
                    style={AFITStyle.input}
                    placeholder="Название категории"
                    name="categoryTitle"
                    value={category}
                    onChange={onInputChange}
                    extraClass={styles.titleInput}
                />
                <button onClick={onButtonClick} className={styles.addBtn}>{id ? 'Изменить' : 'Добавить'} категорию</button>
            </div>
        </MakeModal>
    )
}

export default AdminAddCategoryModal