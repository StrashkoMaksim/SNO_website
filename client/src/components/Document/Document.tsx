import React, { FC } from 'react'
import styles from "../DocumentsSection/DocumentsSection.module.scss"
import ellipse from "../../assets/img/ellipse.svg"
import pdfIcon from "../../assets/img/pdfIcon.svg"
import docIcon from "../../assets/img/docIcon.svg"
import EditButton from "../EditButton/EditButton"

interface DocumentProps {
    _id: string
    type: string
    name: string
    link: string
    onEdit?: () => void
}

const Document: FC<DocumentProps> = ({ _id, link, name, type, onEdit }) => {
    return (
        <div key={_id} className={styles.Documents__Single}>
            <img className={styles.linkImg}
                src={type === 'link' ? ellipse
                    : type === 'pdf' ? pdfIcon : docIcon} alt="" />
            <a className={styles.DocLink} href={type === 'link' ? link : `${process.env.REACT_APP_SERVER_URL}/${link}`} target="_blank">{name}</a>
            {onEdit && <EditButton onClick={onEdit} additionalClass={styles.edit} />}
        </div>
    )
}

export default Document