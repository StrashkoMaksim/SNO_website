import React from 'react';
import {Link} from "react-router-dom";
import ArrowLeft from '../../assets/img/arrow_left.svg'
import styles from './LinkBack.module.scss'

interface LinkBackState {
    text: string,
    to: string
}

const LinkBack = ({ text, to }: LinkBackState) => {
    return (
        <Link to={to} className={styles.link}>
            <img src={ArrowLeft} alt={text}/>
            <span>{text}</span>
        </Link>
    )
}

export default LinkBack;