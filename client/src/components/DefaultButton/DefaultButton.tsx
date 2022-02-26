import styles from "./DefaultButton.module.scss"
import { MouseEventHandler } from "react";
import cn from "classnames";

import React, { FC } from "react";

export enum ButtonStyles {
    filled = "filled",
    outlined = "outlined"
}

export enum ButtonTypes {
    button = 'button',
    submit = 'submit'
}

interface ButtonProps {
    text: string,
    style: ButtonStyles,
    type: ButtonTypes,
    imgSrc?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    extraClass?: string;
}

const DefaultButton: FC<ButtonProps> = ({ text, style, type, imgSrc, onClick, extraClass }) => {
    return (
        <button
            className={cn(styles.DefaultButton, extraClass, style === ButtonStyles.filled ? styles['DefaultButton-filled'] : styles['DefaultButton-outlined'])}
            onClick={onClick}
            type={type}

        >
            {imgSrc && <img src={imgSrc} alt={text} />}
            <span>{text}</span>
        </button>
    )
}

export default DefaultButton;