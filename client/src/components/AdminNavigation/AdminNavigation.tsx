import React, {FC, useState} from 'react';
import cn from "classnames";
import styles from "./AdminNavigation.module.scss";
import {Link} from "react-router-dom";
import NewsImg from "../../assets/img/admin_nav_news.svg";
import SectionImg from "../../assets/img/admin_nav_section.svg";
import DocumentsImg from "../../assets/img/admin_nav_documents.svg";
import CouncilImg from "../../assets/img/admin_nav_council.svg";

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

interface AdminNavigationProps {
    isNavOpen: boolean
}

const AdminNavigation:FC<AdminNavigationProps> = ({ isNavOpen }) => {
    const [currentPage, setCurrentPage] = useState<string>('news')

    const onClickLinkHandler = (link: string) => {
        return () => {
            setCurrentPage(link)
        }
    }

    return (
        <nav className={cn(styles.nav, {[styles.navActive]: isNavOpen})}>
            {navLinks.map(link =>
                <Link to={'/admin/' + link.link}
                      key={link.link}
                      className={cn({[styles.navLinkActive]: currentPage === link.link})}
                      onClick={onClickLinkHandler(link.link)}>
                    <img src={link.imgSrc} alt={link.text}/>
                    <span>{link.text}</span>
                </Link>
            )}
        </nav>
    );
};

export default AdminNavigation;