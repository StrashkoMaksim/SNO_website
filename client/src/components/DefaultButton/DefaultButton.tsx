import { useEffect } from "react";
import styles from "./DefaultButton.module.scss"

export interface ButtonProps {
    text: string,
    id?: string
}

const DefaultButton = (props: ButtonProps) => {
    return <button id={props.id} className={styles.DefaultButton}>{props.text}</button>
}

export default DefaultButton;