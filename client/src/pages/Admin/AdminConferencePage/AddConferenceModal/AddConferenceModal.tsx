import { FC, FormEvent, useState } from "react"
import MakeModal from "../../../../components/MakeModal/MakeModal"
import TextField from '@mui/material/TextField';
import styles from "./AddConferenceModal.module.scss"
import ErrorMessage from "../../../../components/ErrorMessage/ErrorMessage";
import { emptyConference, IConference } from "../../../../types/conference";
import AdminFormInputText, { AFITStyle } from "../../../../components/Admin/AdminFormInputText/AdminFormInputText";

interface AADMProps {
    modalOpened: boolean,
    closeModal: () => void
    onSubmit: (conference: any) => void
}

interface ISelectedDocument {
    img: string,
    name: string
}

const AddConferenceModal: FC<AADMProps> = ({ modalOpened, closeModal, onSubmit }) => {

    const [conference, setConference] = useState<IConference>(emptyConference)
    const [selectedDocument, setSelectedDocument] = useState<ISelectedDocument>({ img: '', name: '' })
    const [errorMessage, setErrorMessage] = useState<string>('')

    const onChangeTextInputsHandle = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const inputName = e.currentTarget.name;
        const inputValue = e.currentTarget.value;
        setConference(prevState => ({ ...prevState, [inputName]: inputValue }))
    }

    const onFileChangeHandle = (e: FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            const file: File = e.currentTarget.files[0]
            const fileName: string = file?.name

            setConference(prevState => ({ ...prevState, image: file }))
            setSelectedDocument(prevState => ({ ...prevState, img: '', name: fileName }))
        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!conference.image) {
            setErrorMessage('Файл не выбран')
            setTimeout(() => setErrorMessage(''), 3000)
            return
        }

        setConference(emptyConference)
        setSelectedDocument({ img: '', name: '' })
        onSubmit(conference)
        closeModal()
    }

    return (
        <MakeModal modalOpened={modalOpened} closeModal={closeModal} >
            <ErrorMessage errMessage={errorMessage} />
            <form className={styles.form} onSubmit={handleSubmit}>

                <AdminFormInputText
                    placeholder="Описание конференции"
                    name="description"
                    value={conference.description}
                    style={AFITStyle.textarea}
                    onChange={onChangeTextInputsHandle}
                    required
                />

                <label htmlFor="confImgInput">

                    <div className={styles.fileInputLabel}>Добавить изображение</div>
                    {selectedDocument.name &&
                        <div className={styles.selectedFileBlock}>
                            <p>{selectedDocument.name}</p>
                        </div>
                    }

                    <input
                        type='file'
                        accept=".jpg"
                        id='confImgInput'
                        className={'visually-hidden'}
                        onChange={onFileChangeHandle}></input>

                </label>

                <button className={styles.addBtn}>Добавить конференцию</button>
            </form>
        </MakeModal>
    )
}

export default AddConferenceModal