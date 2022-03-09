import styles from "./AdminFormInputImg.module.scss"
import cn from "classnames"
import { FC, useState } from 'react'

interface AFIIProps {
    name: string,
    onChange: (e: any) => void,
    defaultImg: string,
    id: string,
    accept?: string,
    extraClass?: string,
    required?: boolean
}


const AdminFormInputImg: FC<AFIIProps> = ({ name, onChange, defaultImg, id, accept = '.jpg', extraClass, required = true }) => {

    const [inputImage, setInputImage] = useState<string>(defaultImg)

    const onChangeHandler = (event: any) => {

        const img = event.target.files[0];
        if (img) {
            const imgURL = URL.createObjectURL(img)
            setInputImage(imgURL)
        }
        onChange(event)
    }

    return (
        <div className={extraClass}>
            <input
                className={'visually-hidden'}
                type="file"
                name={name}
                accept={accept}
                required={required}
                id={id}
                onChange={onChangeHandler} />

            <label htmlFor={id} className={styles.imgContainer}>
                <img className={styles.previewImg} src={inputImage} alt="Image input" />
            </label>
        </div>
    )
}

export default AdminFormInputImg;