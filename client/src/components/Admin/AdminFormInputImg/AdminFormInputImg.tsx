import styles from "./AdminFormInputImg.module.scss"
import cn from "classnames"
import { FC, useState } from 'react'
import placeholderImg from '../../../assets/img/placeholderImg.png'

interface AFIIProps {
    name: string,
    onChange: (e: any) => void,
    defaultImg?: string,
    extraClass?: string,
    required?: boolean
}


const AdminFormInputImg: FC<AFIIProps> = ({ name, onChange, defaultImg, extraClass, required = true }) => {

    const [newsImage, setNewsImage] = useState<string>(defaultImg ? defaultImg : placeholderImg)

    const onChangeHandler = (event: any) => {

        const img = event.target.files[0];
        if (img) {
            const imgURL = URL.createObjectURL(img)
            setNewsImage(imgURL)
        }
        onChange(event)
    }

    return (
        <>
            <input
                className={cn(styles['visually-hidden'], extraClass)}
                type="file"
                name={name}
                accept=".jpg"
                required={required}
                id='previewImg'
                onChange={onChangeHandler} />

            <label htmlFor='previewImg' className={styles.imgContainer}>
                <img className={styles.previewImg} src={newsImage} alt="News picture" />
            </label>
        </>
    )
}

export default AdminFormInputImg;