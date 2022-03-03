import styles from "./AdminFormInputImg.module.scss"
import cn from "classnames"
import { FC, useState } from 'react'

interface AFIIProps {
    name: string,
    onChange: (e: any) => void,
    defaultImg: string,
    extraClass?: string,
    required?: boolean
}


const AdminFormInputImg: FC<AFIIProps> = ({ name, onChange, defaultImg, extraClass, required = true }) => {

    const [newsImage, setNewsImage] = useState<string>(defaultImg)

    const onChangeHandler = (event: any) => {

        const img = event.target.files[0];
        if (img) {
            const imgURL = URL.createObjectURL(img)
            setNewsImage(imgURL)
        }
        onChange(event)
    }

    return (
        <div className={extraClass}>
            <input
                className={styles['visually-hidden']}
                type="file"
                name={name}
                accept=".jpg"
                required={required}
                id='previewImg'
                onChange={onChangeHandler} />

            <label htmlFor='previewImg' className={styles.imgContainer}>
                <img className={styles.previewImg} src={newsImage} alt="News picture" />
            </label>
        </div>
    )
}

export default AdminFormInputImg;