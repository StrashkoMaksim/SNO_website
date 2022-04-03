import AdminFormInputImg from "../../../../components/Admin/AdminFormInputImg/AdminFormInputImg"
import AdminFormInputText, { AFITStyle } from "../../../../components/Admin/AdminFormInputText/AdminFormInputText"
import styles from "./Conference.module.scss"
import http from "../../../../assets/http-config";

import { FC, useEffect, useState } from "react"
import DocumentsSection from "../../../../components/DocumentsSection/DocumentsSection";
import DefaultButton, { ButtonStyles, ButtonTypes } from "../../../../components/DefaultButton/DefaultButton";
import { IConference } from "../../../../types/conference";


interface ConferenceProps {
    _conference: IConference,
    triggerDataFetch: () => void
}

const Conference: FC<ConferenceProps> = ({ _conference, triggerDataFetch }) => {

    const [conference, setConference] = useState<IConference>(_conference)

    useEffect(() => {
        setConference(_conference)

        const conferenceImage = fetch(`${process.env.REACT_APP_SERVER_URL}/${_conference?.image}`)
            .then(res => res.blob())
            .then(blob => new File([blob], _conference?.image.toString(), blob))
            .then(file => setConference(prevState => ({ ...prevState, 'image': file })))

    }, [_conference])

    const onImageChange = (img: File) => {
        if (img)
            setConference(prevState => ({ ...prevState, image: img }))
    }

    const onTextChange = (e: any) => {
        setConference(prevState => ({ ...prevState, description: e.target.value }))
    }


    const deleteDocument = async (id: string, documentNumber: number) => {

        console.log(documentNumber)

        await http.delete(`/conference/${_conference?._id}/${documentNumber}`,
            {
                headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            .then(() => triggerDataFetch())

    }

    const addDocument = async (document: any) => {
        const fd = new FormData();
        fd.set('name', document.name)
        fd.set('link', document.link)
        fd.set('file', document.file)

        await http.post(`/conference/${conference?._id}`, fd,
            {
                headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            .then(() => triggerDataFetch())
            .catch(err => alert('Некорректный формат ссылки'))

    }

    const sumbitConference = async () => {
        const fd = new FormData();
        fd.set('description', conference.description)
        fd.set('image', conference.image)

        await http.put(`/conference/${conference?._id}`, fd,
            {
                headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            .then(() => triggerDataFetch())
    }

    const deleteConference = async () => {
        await http.delete(`/conference/${conference?._id}`,
            {
                headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            .then(() => triggerDataFetch())
    }

    return (
        <>
            <section className={styles.conference}>
                <div className={styles.deleteBtnWrapper}>
                    <button
                        className={styles.deleteBtn}
                        onClick={deleteConference}
                    >
                        Удалить конференцию
                    </button>
                </div>
                <div>
                    <AdminFormInputImg
                        name="image"
                        onChange={onImageChange}
                        id='image'
                        defaultImg={conference?.image}
                        extraClass={styles.conference__image}
                    />
                    <div className={styles.conference__description}>
                        <AdminFormInputText
                            name="description"
                            style={AFITStyle.textarea}
                            placeholder='Описание конференции'
                            value={conference?.description}
                            onChange={onTextChange}
                        />
                    </div>
                </div>

                <DefaultButton
                    text="Сохранить конференцию"
                    style={ButtonStyles.adminFilled}
                    type={ButtonTypes.button}
                    onClick={sumbitConference}
                    extraClass={styles.saveConferenceBtn}
                />

                <DocumentsSection
                    title={'Документы'}
                    documents={conference?.documents}
                    deleteDocument={deleteDocument}
                    id={'1'}
                    addDocument={addDocument}
                    isAdmin
                />

            </section>


        </>
    )
}

export default Conference