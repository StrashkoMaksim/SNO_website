import React from "react";
import styles from "./Footer.module.scss"
import DefaultButton, { ButtonStyles } from "../DefaultButton/DefaultButton";
import waLogo from "../../assets/img/whatsappLogo.svg"
import instaLogo from "../../assets/img/instagramLogo.svg"
import ytLogo from "../../assets/img/youtubeLogo.svg"
import cn from "classnames";
import ModalCallForm from "../CallForm/ModalCallForm";

const Footer = () => {

    const [modalOpened, setModalOpened] = React.useState<boolean>(false);
    const openModalForm = () => setModalOpened(true)
    const closeModalForm = () => setModalOpened(false)

    return (
        <footer className={cn('section', styles.Footer)}>
            <div className={cn('container', styles.Footer__Container)}>
                <ModalCallForm modalOpened={modalOpened} closeModal={closeModalForm} />

                <div className={styles.Footer__Block}>
                    <h3 className={styles.Footer__Block__Title}>Разделы сайта</h3>
                    <div className={styles.Footer__Block__Links}>
                        <a href="*" className={styles.navlink}>О СНО</a>
                        <a href="*" className={styles.navlink}>Руководители</a>
                        <a href="*" className={styles.navlink}>Совет СНО</a>
                        <a href="*" className={styles.navlink}>Регистрация участников</a>
                        <a href="*" className={styles.navlink}>Мероприятия</a>
                        <a href="*" className={styles.navlink}>Документы</a>
                        <a href="*" className={styles.navlink}>Студенческая конференция</a>
                        <a href="*" className={styles.navlink}>Повышенная стипендия</a>
                    </div>
                </div>
                <div className={styles.Footer__Block}>
                    <h3 className={styles.Footer__Block__Title}>Контакты</h3>
                    <div className={styles.Footer__Block__Links}>
                        <label className={styles.Footer__Label}>Телефоны:</label>
                        <a href="tel: +7 (999) 999-99-99" className={styles.navlink}>
                            <span>
                                +7 (999) 999-99-99
                            </span>
                        </a>
                        <a href="tel: +7 (999) 999-99-99" className={styles.navlink}>
                            <span>
                                +7 (999) 999-99-99
                            </span>
                        </a>
                    </div>
                    <div className={styles.Footer__Block__Links}>
                        <label className={styles.Footer__Label}>Почта:</label>
                        <a href="email: mail@mail.ru" className={styles.navlink}>
                            <span>
                                mail@mail.ru
                            </span>
                        </a>
                    </div>
                    <div className={styles.Footer__Block__Links}>
                        <label className={styles.Footer__Label}>Адрес:</label>
                        <p className={styles.Footer__Paragraph}>г. Хабаровск, ул. Пушкина,
                            д. 25, оф. 256:</p>
                    </div>
                </div>
                <div className={cn(styles.Footer__Block, styles.LinksBlock)}>
                    <DefaultButton text="Заказать звонок" style={ButtonStyles.outlined} onClick={openModalForm}></DefaultButton>
                    <DefaultButton text="Зарегистрироваться" style={ButtonStyles.outlined}></DefaultButton>
                    <div className={styles.socialNetworks}>
                        <a href="*"><img src={waLogo} alt="whats app link" /></a>
                        <a href="*"><img src={instaLogo} alt="instagram link" /></a>
                        <a href="*"><img src={ytLogo} alt="youtube link" /></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;