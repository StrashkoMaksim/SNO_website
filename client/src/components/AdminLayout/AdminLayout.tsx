import React, { FC, ReactNode, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from './AdminLayout.module.scss'
import { useActions } from "../../hooks/useActions";

import Logo from '../../assets/img/headerLogo.svg'
import LogoutImg from '../../assets/img/logout.svg'
import NewsImg from '../../assets/img/admin_nav_news.svg'
import DocumentsImg from '../../assets/img/admin_nav_documents.svg'
import CouncilImg from '../../assets/img/admin_nav_council.svg'
import SectionImg from '../../assets/img/admin_nav_section.svg'

const navLinks = [
    { link: 'news', text: 'Новости', imgSrc: NewsImg },
    { link: 'sections', text: 'Кружки', imgSrc: SectionImg },
    { link: 'conf', text: 'Конференция', imgSrc: NewsImg },
    { link: 'documents', text: 'Документы', imgSrc: DocumentsImg },
    { link: 'grants', text: 'Стипендия', imgSrc: NewsImg },
    { link: 'supervisors', text: 'Руководители', imgSrc: NewsImg },
    { link: 'council', text: 'Совет СНО', imgSrc: CouncilImg },
    { link: 'events', text: 'Мероприятия', imgSrc: NewsImg },
]

interface AdminLayoutProps {
    currPage: string
    children?: ReactNode
}

const AdminLayout: FC<AdminLayoutProps> = ({ children, currPage }) => {
    const [currentPage, setCurrentPage] = useState<string>(currPage)
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
    const { logoutUser } = useActions()

    const burgerClickHandler = () => {
        setIsNavOpen(!isNavOpen)
    }

    const navLinkClickHandle = (link: string) => {
        setCurrentPage(link)
    }

    return (
        <div className={cn("section", styles.adminLayout)}>
            <div className={cn("container", styles.adminLayout__container)}>
                <aside>
                    <Link to="/" className={styles.adminLayout__logo}>
                        <img src={Logo} alt="Логотип СНО" />
                    </Link>
                    <div className={styles.adminLayout__title}>
                        <h2>Админ-панель</h2>
                        <button onClick={logoutUser}>
                            <img src={LogoutImg} alt="Выйти" />
                        </button>
                        <button className={cn(styles.adminLayout__burger, { [styles.adminLayout__burgerActive]: isNavOpen })}
                            onClick={burgerClickHandler}>
                            <div></div>
                            <div></div>
                            <div></div>
                        </button>
                    </div>
                    <nav className={cn(styles.adminLayout__nav, { [styles.adminLayout__navActive]: isNavOpen })}>
                        {navLinks.map(link =>
                            <Link to={'/admin/' + link.link}
                                className={cn({ [styles.navLinkActive]: currentPage === link.link })}
                                onClick={() => { navLinkClickHandle(link.link) }}>
                                <img src={link.imgSrc} alt={link.text} />
                                <span>{link.text}</span>
                            </Link>
                        )}
                    </nav>
                </aside>
                <main>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AdminLayout