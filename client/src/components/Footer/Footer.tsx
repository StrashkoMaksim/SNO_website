import React from "react";
import styles from "./Footer.module.scss"
import DefaultButton, { ButtonStyles, ButtonTypes } from "../DefaultButton/DefaultButton";
import waLogo from "../../assets/img/whatsappLogo.svg"
import instaLogo from "../../assets/img/instagramLogo.svg"
import ytLogo from "../../assets/img/youtubeLogo.svg"
import cn from "classnames";

import CallForm from "../CallForm/CallForm";
import MakeModal from "../MakeModal/MakeModal";
import { Link } from "react-router-dom";
import LinkButton from "../LinkButton/LinkButton";

const Footer = () => {

    const [modalOpened, setModalOpened] = React.useState<boolean>(false);
    const openModalForm = () => setModalOpened(true)
    const closeModalForm = () => setModalOpened(false)

    return (
        <footer className={cn('section', styles.Footer)}>
            <div className={cn('container', styles.Footer__Container)}>
                <MakeModal modalOpened={modalOpened} closeModal={closeModalForm}>
                    <CallForm modal closeModal={closeModalForm}></CallForm>
                </MakeModal>

                <div className={styles.Footer__Block}>
                    <div>
                        <h3 className={styles.Footer__Block__Title}>Разделы сайта</h3>
                        <div className={styles.Footer__Block__Links}>
                            
                            <Link to={"/about"}  className={styles.navlink}>О СНО</Link>
                            <Link to={"/supervisors"}  className={styles.navlink}>Руководители</Link>
                            <Link to={"/council"}  className={styles.navlink}>Совет СНО</Link>
                            <Link to={"/registration"}  className={styles.navlink}>Регистрация участников</Link>
                            <Link to={"/events"}  className={styles.navlink}>Мероприятия</Link>
                            <Link to={"/documents"}  className={styles.navlink}>Документы</Link>
                            <Link to={"/conference"}  className={styles.navlink}>Студенческая конференция</Link>
                            <Link to={"/grants"}  className={styles.navlink}>Повышенная стипендия</Link>
                        </div>
                    </div>
                </div>
                <div className={styles.Footer__Block}>
                    <div>
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
                </div>
                <div className={cn(styles.Footer__Block, styles.LinksBlock)}>
                    <DefaultButton text="Заказать звонок" style={ButtonStyles.outlined} type={ButtonTypes.button} onClick={openModalForm} extraClass={styles['max-width']} />
                    {/* <DefaultButton extraClass={styles.maxWidth} text="Зарегистрироваться" style={ButtonStyles.outlined} type={ButtonTypes.button} /> */}
                    <LinkButton text={"Зарегистрироваться"} to={"registration"} extraClass={styles.linkB}/>
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