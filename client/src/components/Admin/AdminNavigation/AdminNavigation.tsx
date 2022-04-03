import React, { FC, useState } from 'react';
import cn from "classnames";
import styles from "./AdminNavigation.module.scss";
import { Link } from "react-router-dom";
import NewsImg from "../../../assets/img/admin_nav_news.svg";
import SectionImg from "../../../assets/img/admin_nav_section.svg";
import DocumentsImg from "../../../assets/img/admin_nav_documents.svg";
import CouncilImg from "../../../assets/img/admin_nav_council.svg";
import SupervisorsImg from "../../../assets/img/admin_nav_supervisors.svg";
import ConferenceImg from "../../../assets/img/admin_nav_conference.svg";
import ScholarshipImg from "../../../assets/img/admin_nav_scholarship.svg";
import EventsImg from "../../../assets/img/admin_nav_events.svg";
import PartnersImg from "../../../assets/img/admin_nav_partners.svg";

const navLinks = [
    { link: 'news', text: 'Новости', imgSrc: NewsImg },
    { link: 'activities', text: 'Кружки', imgSrc: SectionImg },
    { link: 'conference', text: 'Конференция', imgSrc: ConferenceImg },
    { link: 'documents', text: 'Документы', imgSrc: DocumentsImg },
    { link: 'grants', text: 'Стипендия', imgSrc: ScholarshipImg },
    { link: 'supervisors', text: 'Руководители', imgSrc: SupervisorsImg },
    { link: 'council', text: 'Совет СНО', imgSrc: CouncilImg },
    { link: 'events', text: 'Мероприятия', imgSrc: EventsImg },
    { link: 'partners', text: 'Партнеры', imgSrc: PartnersImg },
]

interface AdminNavigationProps {
    isNavOpen: boolean
    onClick: () => void
}

const AdminNavigation: FC<AdminNavigationProps> = ({ isNavOpen, onClick }) => {
    const [currentPage, setCurrentPage] = useState<string>('news')

    const onClickLinkHandler = (link: string) => {
        return () => {
            setCurrentPage(link)
            onClick()
        }
    }

    return (
        <nav className={cn(styles.nav, { [styles.navActive]: isNavOpen })}>
            {navLinks.map(link =>
                <Link to={'/admin/' + link.link}
                    key={link.link}
                    className={cn({ [styles.navLinkActive]: currentPage === link.link })}
                    onClick={onClickLinkHandler(link.link)}
                >
                    <img src={link.imgSrc} alt={link.text} />
                    <span>{link.text}</span>
                </Link>
            )}
        </nav>
    );
};

export default AdminNavigation;