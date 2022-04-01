import { FC, FormEvent, useState } from "react"
import MakeModal from "../../../../components/MakeModal/MakeModal"
import TextField from '@mui/material/TextField';
import styles from "./AddPartnerModal.module.scss"
import ErrorMessage from "../../../../components/ErrorMessage/ErrorMessage";

interface AADMProps {
    modalOpened: boolean,
    closeModal: () => void
    onSubmit: (partner: any) => void
}

interface Partner {
    img?: File,
    link: string,
    _id: string
}

const emptyPartner = {
    img: undefined,
    link: '',
    _id: ''
}

interface ISelectedDocument {
    img: string,
    name: string
}

const AddPartnerModal: FC<AADMProps> = ({ modalOpened, closeModal, onSubmit }) => {

    const [partner, setPartner] = useState<Partner>(emptyPartner)
    const [selectedDocument, setSelectedDocument] = useState<ISelectedDocument>({ img: '', name: '' })
    const [errorMessage, setErrorMessage] = useState<string>('')

    const onChangeTextInputsHandle = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const inputName = e.currentTarget.name;
        const inputValue = e.currentTarget.value;
        setPartner(prevState => ({ ...prevState, [inputName]: inputValue }))
    }

    const onFileChangeHandle = (e: FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            const file: File = e.currentTarget.files[0]
            const fileName: string = file?.name

            setPartner(prevState => ({ ...prevState, img: file }))
            setSelectedDocument(prevState => ({ ...prevState, img: '', name: fileName }))
        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!partner.img) {
            setErrorMessage('Файл не выбран')
            setTimeout(() => setErrorMessage(''), 3000)
            return
        }

        setPartner(emptyPartner)
        setSelectedDocument({ img: '', name: '' })
        onSubmit(partner)
        closeModal()
    }

    return (
        <MakeModal modalOpened={modalOpened} closeModal={closeModal} >
            <ErrorMessage errMessage={errorMessage} />
            <form className={styles.form} onSubmit={handleSubmit}>

                <TextField
                    label='Ссылка на партнера'
                    name="link"
                    value={partner.link}
                    onChange={onChangeTextInputsHandle}
                    required
                />

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
                        accept=".png"
                        id='fileInput'
                        className={'visually-hidden'}
                        onChange={onFileChangeHandle}></input>

                </label>

                <button className={styles.addBtn}>Добавить партнера</button>
            </form>
        </MakeModal>
    )
}

export default AddPartnerModal