import React from "react";
import headerLogo from "../../assets/img/headerLogo.svg"
import DefaultButton from "../DefaultButton/DefaultButton";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss"
import PhoneIcon from "../../assets/img/Phone.svg"

const Header = () => {

    const [menuOpened, setMenuOpened] = React.useState<boolean>(false)

    const menuOpen: string = styles['menu-open'];
    const burgerOpen: string = styles['burger-open'];
    const headerStyle = {
        'overflow': menuOpened ? 'visible' : 'hidden'
    }

    return (
        <header className={styles.Header} style={headerStyle}>
            <div className={styles.Header__Top}>
                <img src={headerLogo} alt="Логотип СНО ДВГУПС" id="headerLogo" />
                <div className={styles.Header__Top__Call}>
                    <DefaultButton text='Заказать звонок' id="RequestACallBtn"></DefaultButton>
                    <a href="tel: +7 (999) 999-99-99" className={`${styles.PhoneNumber} ${styles.ExtraLight}`}>
                        <span>
                            +7 (999) 999-99-99
                        </span>
                        <img src={PhoneIcon} alt="Phone Icon" />
                    </a>
                    <button className={`${styles.Burger} ${menuOpened ? burgerOpen : null}`} onClick={e => setMenuOpened(!menuOpened)}><div /><div /><div /></button>
                </div>
            </div>
            <nav className={`${styles.Header__Navigation} ${menuOpened ? menuOpen : null}`}>
                <Link className={styles.Header__Link} to={'/'}>О СНО</Link>
                <Link className={styles.Header__Link} to={'/'}>Рукововодители</Link>
                <Link className={styles.Header__Link} to={'/'}>Совет СНО</Link>
                <Link className={styles.Header__Link} to={'/'}>Регистрация участников</Link>
                <Link className={styles.Header__Link} to={'/'}>Мероприятия</Link>
                <Link className={styles.Header__Link} to={'/'}>Документы</Link>
                <Link className={styles.Header__Link} to={'/'}>Студенческая конференция</Link>
                <Link className={styles.Header__Link} to={'/'}>Повышенная стипендия</Link>
            </nav>
        </header>);
}

export default Header;