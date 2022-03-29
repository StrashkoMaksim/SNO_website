import { FC, FormEvent, useState } from "react"
import MakeModal from "../../../../components/MakeModal/MakeModal"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import styles from "./AdminAddDocumentModal.module.scss"
import docIcon from '../../../../assets/img/docIcon.svg'
import pdfIcon from '../../../../assets/img/pdfIcon.svg'
import ErrorMessage from "../../../../components/ErrorMessage/ErrorMessage";

interface AADMProps {
    modalOpened: boolean,
    closeModal: () => void
    id?: string
    deleteDocument?: (id: string) => void
    onSubmit: (document: Document) => void
}

enum DocumentType {
    link = 'link',
    file = 'file'
}

interface Document {
    _id: string
    name: string,
    type: DocumentType,
    file?: File | null,
    link?: string
}

const emptyDocument = {
    _id: '',
    name: '',
    type: DocumentType.link,
    file: null,
    link: ''
}

interface ISelectedDocument {
    img: string,
    name: string
}

const AdminAddDocumentModal: FC<AADMProps> = ({ modalOpened, closeModal, id, deleteDocument, onSubmit }) => {

    const [document, setDocument] = useState<Document>(emptyDocument)
    const [selectedDocument, setSelectedDocument] = useState<ISelectedDocument>({ img: '', name: '' })
    const [errorMessage, setErrorMessage] = useState<string>('')

    const handleTypeChange = (event: React.MouseEvent<HTMLElement>, newDocumentType: DocumentType | null) => {
        if (newDocumentType != null) {
            // Меняем тип и сбрасываем другие инпуты
            setDocument({ ...document, type: newDocumentType, name: '', file: null, link: '' })
            setSelectedDocument({ img: '', name: '' })
        };
    }

    const onChangeTextInputsHandle = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const inputName = e.currentTarget.name;
        const inputValue = e.currentTarget.value;
        setDocument(prevState => ({ ...prevState, [inputName]: inputValue }))
    }

    const onFileChangeHandle = (e: FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            const file: File = e.currentTarget.files[0]
            const fileName: string = file?.name
            const fileType = fileName.slice(fileName.length - 3) === 'pdf' ? pdfIcon : docIcon

            setDocument(prevState => ({ ...prevState, file: file }))
            setSelectedDocument(prevState => ({ ...prevState, img: fileType, name: fileName }))
        }
    }

    const deleteThisDocument = () => {
        if (deleteDocument && id) deleteDocument(id)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (document.type === 'file' && !document.file) {
            setErrorMessage('Файл не выбран')
            setTimeout(() => setErrorMessage(''), 3000)
            return
        }

        onSubmit(document)
        closeModal()
    }

    return (
        <MakeModal modalOpened={modalOpened} closeModal={closeModal} >
            <ErrorMessage errMessage={errorMessage} />
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.pickerElement}>
                    <ToggleButtonGroup
                        value={document.type}
                        exclusive
                        onChange={handleTypeChange}
                    >
                        <ToggleButton value={DocumentType.link}>
                            <span>Ссылка</span>
                        </ToggleButton>

                        <ToggleButton value={DocumentType.file}>
                            <span>Файл</span>
                        </ToggleButton>

                    </ToggleButtonGroup>
                </div>

                <TextField
                    label='Название документа'
                    name="name"
                    value={document.name}
                    onChange={onChangeTextInputsHandle}
                    required
                />

                {document.type === DocumentType.link ?
                    <TextField
                        label='Ссылка на документ'
                        name="link"
                        value={document.link}
                        onChange={onChangeTextInputsHandle}
                        required
                    />
                    :
                    <label htmlFor="fileInput">

                        <div className={styles.fileInputLabel}>Добавить файл</div>
                        {selectedDocument.name &&
                            <div className={styles.selectedFileBlock}>
                                <img src={selectedDocument.img} alt="" />
                                <p>{selectedDocument.name}</p>
                            </div>
                        }

                        <input
                            type='file'
                            accept="application/pdf, application/msword, .doc, .docx"
                            id='fileInput'
                            className={'visually-hidden'}
                            onChange={onFileChangeHandle}></input>

                    </label>
                }

                <button className={styles.addBtn}>{id ? 'Изменить' : 'Добавить'} документ</button>
                {deleteDocument && <button className={styles.deleteBtn} onClick={deleteThisDocument}>Удалить документ</button>}
            </form>
        </MakeModal>
    )
}

export default AdminAddDocumentModal