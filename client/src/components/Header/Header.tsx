import React, { FC, useEffect } from "react";
import headerLogo from "../../assets/img/headerLogo.svg"
import DefaultButton, { ButtonStyles, ButtonTypes } from "../DefaultButton/DefaultButton";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss"
import PhoneIcon from "../../assets/img/Phone.svg"
import cn from "classnames";
import CallForm from "../../components/CallForm/CallForm"
import MakeModal from "../MakeModal/MakeModal";


const Header = () => {
    const [menuOpened, setMenuOpened] = React.useState<boolean>(false)

    const [modalOpened, setModalOpened] = React.useState<boolean>(false);
    const openModalForm = () => setModalOpened(true)
    const closeModalForm = () => setModalOpened(false)

    const burgerClickHandler = (e: React.MouseEvent<HTMLElement>) => {
        setMenuOpened(!menuOpened)
    }

    return (

        <header className={cn('section', styles.Header)}>
            <div className={cn('container', styles.Header__Container)}>
                <MakeModal modalOpened={modalOpened} closeModal={closeModalForm}>
                    <CallForm hasCloseBtn={true} closeModal={closeModalForm}></CallForm>
                </MakeModal>
                <div className={styles.Header__Top}>
                    <Link to={'/'}>
                        <img src={headerLogo} alt="Логотип СНО ДВГУПС" id="headerLogo" />
                    </Link>
                    <div className={styles.Header__Top__Call}>
                        <DefaultButton text='Заказать звонок' style={ButtonStyles.filled} type={ButtonTypes.button} onClick={openModalForm}></DefaultButton>
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
                    <Link className={styles.Header__Link} to={'/about'}>О СНО</Link>
                    <Link className={styles.Header__Link} to={'/supervisors'}>Руководители</Link>
                    <Link className={styles.Header__Link} to={'/council'}>Совет СНО</Link>
                    <Link className={styles.Header__Link} to={'/registration'}>Регистрация участников</Link>
                    <Link className={styles.Header__Link} to={'/events'}>Мероприятия</Link>
                    <Link className={styles.Header__Link} to={'/documents'}>Документы</Link>
                    <Link className={styles.Header__Link} to={'/conference'}>Студенческая конференция</Link>
                    <Link className={styles.Header__Link} to={'/grants'}>Повышенная стипендия</Link>
                </nav>
            </div>
        </header>);
}

export default Header;