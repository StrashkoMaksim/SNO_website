import styles from "./AdminFormInputImg.module.scss"
import {FC, FormEvent} from 'react'
import placeholderImg from "../../../assets/img/roundPlaceholderImg.png"

interface AFIIProps {
    name: string,
    onChange: (e: any) => void,
    defaultImg: string | Blob,
    id: string,
    accept?: string,
    extraClass?: string,
    required?: boolean
}


const AdminFormInputImg: FC<AFIIProps> = ({ name, onChange, defaultImg, id, accept = '.jpg', extraClass, required = true }) => {
    defaultImg = defaultImg instanceof Blob ? URL.createObjectURL(defaultImg) : defaultImg
    const imgType = defaultImg.substring(0, 4) === 'blob' ? defaultImg : `${process.env.REACT_APP_SERVER_URL}/${defaultImg}`
    const imgSrc = defaultImg ? imgType : placeholderImg

    const onChangeHandler = (event: FormEvent<HTMLInputElement>) => {
        if (event.currentTarget.files) {
            onChange(event.currentTarget.files[0])
        }
    }

    return (
        <div className={extraClass}>
            <input
                className="visually-hidden"
                type="file"
                name={name}
                accept={accept}
                required={required}
                id={id}
                onChange={onChangeHandler} />

            <label htmlFor={id} className={styles.imgContainer}>
                <img className={styles.previewImg} src={imgSrc} alt="Image input" />
            </label>
        </div>
    )
}

export default AdminFormInputImg;