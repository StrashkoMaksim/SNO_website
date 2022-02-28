import React, { FC, useEffect } from "react";
import cn from "classnames"
import checkMark from "../../assets/img/checkBoxCheckMark.svg"
import styles from "./CustomCheckBox.module.scss"

interface CustomCheckBoxProps {
    name: string
    label: string
    onChange: Function
    reset: boolean
    extraClass?: string
}

const CustomCheckBox: FC<CustomCheckBoxProps> = ({ name, label, onChange, reset, extraClass }) => {

    const [boxChecked, setBoxChecked] = React.useState<boolean>(false)

    const handleClick = () => {
        onChange(name, !boxChecked)
        setBoxChecked(!boxChecked);
    }

    useEffect(() => {
        if (reset) setBoxChecked(false)
    }, [reset])

    return (
        <label className={cn(styles.Label, extraClass)} htmlFor={name} onClick={handleClick}>
            <div className={styles.CustomCheckBox} >
                <img className={cn(styles.checkMark, { [styles['checkMark-active']]: boxChecked })} src={checkMark} alt="" />
                <input type="checkbox" defaultChecked={boxChecked} hidden name={name} value='Да' />
            </div >
            <span className={styles.Label__Text}>{label}</span>
        </label>

    )
}

export default CustomCheckBox;