import React from "react";
import headerLogo from "../../assets/img/headerLogo.svg"
import DefaultButton from "../DefaultButton/DefaultButton";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss"
import PhoneIcon from "../../assets/img/Phone.svg"
import cn from "classnames";

const Header = () => {
    const [menuOpened, setMenuOpened] = React.useState<boolean>(false)

    const burgerClickHandler = (e: React.MouseEvent<HTMLElement>) => {
        setMenuOpened(!menuOpened)
    }

    return (
        <header className={cn('section', styles.Header)}>
            <div className={cn('container', styles.Header__Container)}>
                <div className={styles.Header__Top}>
                    <img src={headerLogo} alt="Логотип СНО ДВГУПС" id="headerLogo" />
                    <div className={styles.Header__Top__Call}>
                        <DefaultButton text='Заказать звонок'></DefaultButton>
                        <a href="tel: +7 (999) 999-99-99" className={cn(styles.PhoneNumber, styles.ExtraLight)}>
                            <span>
                                +7 (999) 999-99-99
                            </span>
                            <img src={PhoneIcon} alt="Phone Icon" />
                        </a>
                        <button className={cn(styles.Burger, { [styles.burgerOpen]: menuOpened })}
                            onClick={burgerClickHandler}>
                            <div />
                            <div />
                            <div />
                        </button>
                    </div>
                </div>
                <nav className={cn(styles.Header__Navigation, { [styles.menuOpen]: menuOpened })}>
                    <Link className={styles.Header__Link} to={'/'}>О СНО</Link>
                    <Link className={styles.Header__Link} to={'/'}>Руководители</Link>
                    <Link className={styles.Header__Link} to={'/'}>Совет СНО</Link>
                    <Link className={styles.Header__Link} to={'/'}>Регистрация участников</Link>
                    <Link className={styles.Header__Link} to={'/'}>Мероприятия</Link>
                    <Link className={styles.Header__Link} to={'/'}>Документы</Link>
                    <Link className={styles.Header__Link} to={'/'}>Студенческая конференция</Link>
                    <Link className={styles.Header__Link} to={'/'}>Повышенная стипендия</Link>
                </nav>
            </div>
        </header>);
}

export default Header;