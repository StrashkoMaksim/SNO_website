import { useEffect } from "react";
import styles from "./DefaultButton.module.scss"
import cn from "classnames";

import React, { FC } from "react";

export enum ButtonStyles {
    filled = "filled",
    outlined = "outlined"
}

interface ButtonProps {
    text: string,
    style: ButtonStyles,
    onClick?: Function
}

const DefaultButton: FC<ButtonProps> = ({ text, style, onClick }) => {

    return (<button
        className={cn(styles.DefaultButton, { [styles.OutlinedButton]: style === ButtonStyles.outlined })}
        onClick={() => { if (onClick) onClick() }}
    >{text}</button>)
}

export default DefaultButton;