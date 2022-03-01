import React, {FC, FormEvent, useEffect} from 'react'
import MakeModal from "../MakeModal/MakeModal"
import {useTypedSelector} from "../../hooks/useTypedSelector"
import {useActions} from "../../hooks/useActions"
import DefaultButton, {ButtonStyles, ButtonTypes} from "../DefaultButton/DefaultButton"
import styles from './TagsModal.module.scss'
import DeletableTag from "../DeleteableTag/DeletableTag";

interface TagsModalProps {
    isVisible: boolean
    onClose: () => void
}

const TagsModal: FC<TagsModalProps> = ({ isVisible, onClose }) => {
    const { tags } = useTypedSelector(state => state.tag)
    const { fetchTags, addTag } = useActions()

    useEffect(() => {
        fetchTags()
    }, [])

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        addTag(formData)

        e.currentTarget.reset()
    }

    return (
        <MakeModal modalOpened={isVisible} closeModal={onClose}>
            <h2 className="modal__header">Управление тегами</h2>
            <form className={styles.form} onSubmit={onSubmit}>
                <input type="text" name="name" placeholder="Новый тег" required />
                <DefaultButton text={"Добавить\u00A0тег"} style={ButtonStyles.adminFilled} type={ButtonTypes.submit} />
            </form>
            <hr className={styles.hr}/>
            <div className={styles.tags}>
                {tags.length > 0 && tags.map(tag =>
                    <DeletableTag id={tag._id} name={tag.name} />
                )}
            </div>
        </MakeModal>
    )
}

export default TagsModal