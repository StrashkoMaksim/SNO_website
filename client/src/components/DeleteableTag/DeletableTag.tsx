import React, {FC} from 'react';
import styles from './DeletableTag.module.scss'
import deleteIcon from '../../assets/img/close.svg'
import {useActions} from "../../hooks/useActions";

interface DeletableTagProps {
    id: string
    name: string
}

const DeletableTag: FC<DeletableTagProps> = ({ id, name }) => {
    const { deleteTag } = useActions()

    const onClickHandler = () => {
        deleteTag(id)
    }

    return (
        <div className={styles.tag}>
            <span className={styles.name}>{name}</span>
            <button className={styles.delete} onClick={onClickHandler}>
                <img src={deleteIcon} alt="Удалить"/>
            </button>
        </div>
    )
}

export default DeletableTag