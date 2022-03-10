import React, {FC} from 'react'
import styles from "./EditButton.module.scss"
import editIcon from "../../assets/img/EditIcon.svg"
import cn from "classnames";

interface EditButtonProps {
    additionalClass: string
    onClick: () => void
}

const EditButton: FC<EditButtonProps> = ({ additionalClass, onClick }) => {
    return (
        <button type="button" className={cn(styles.editButton, additionalClass)} onClick={onClick}>
            <img src={editIcon} alt="Редактировать" />
        </button>
    )
}

export default EditButton