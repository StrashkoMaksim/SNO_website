import { TextareaAutosize } from '@mui/material'
import styles from './AdminFormInputText.module.scss'
import cn from 'classnames'
import { FC } from 'react'

export enum AFITStyle {
    textarea = 'textarea',
    input = 'unput'
}

interface AFITProps {
    style: AFITStyle,
    placeholder: string,
    name: string,
    value: string,
    onChange: (e: any) => void,
    extraClass?: string
    required?: boolean
}

const AdminFormInputText: FC<AFITProps> = ({ style, placeholder, name, value, onChange, extraClass, required = true }) => {

    const onChangeHandler = (event: any) => {
        onChange(event)
    }

    return (
        <>
            {
                style === AFITStyle.textarea ?
                    <TextareaAutosize
                        className={cn(styles.input, extraClass)}
                        placeholder={placeholder}
                        name={name}
                        value={value}
                        onChange={onChangeHandler}
                        required={required}
                    />
                    :
                    <input
                        type="text"
                        className={cn(styles.input, extraClass)}
                        placeholder={placeholder}
                        name={name}
                        value={value}
                        onChange={onChangeHandler}
                        required={required}
                    />
            }
        </>
    )
}

export default AdminFormInputText