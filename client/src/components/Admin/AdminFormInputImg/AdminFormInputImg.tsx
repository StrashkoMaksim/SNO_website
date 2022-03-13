import styles from "./AdminFormInputImg.module.scss"
import { FC, useEffect, useState } from 'react'
import placeholderImg from "../../../assets/img/roundPlaceholderImg.png"

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

    useEffect(() => {
        setInputImage(defaultImg)
    }, [defaultImg])

    const onChangeHandler = (event: any) => {
        const img = event.target.files[0]
        if (img) {
            const imgURL = URL.createObjectURL(img)
            setInputImage(imgURL)
        }
        onChange(event)
    }

    const imgType = inputImage.substring(0, 4) === 'blob' ? inputImage : `${process.env.REACT_APP_SERVER_URL}/${inputImage}`
    const imgSrc = defaultImg ? imgType : placeholderImg

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