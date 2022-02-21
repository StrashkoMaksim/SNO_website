import { useEffect } from "react";
import styles from "./DefaultButton.module.scss"

export interface ButtonProps {
    text: string,
    style?: {}
}

const DefaultButton = (props: ButtonProps) => {
    return <button style={props.style} className={styles.DefaultButton}>{props.text}</button>
}

export default DefaultButton;