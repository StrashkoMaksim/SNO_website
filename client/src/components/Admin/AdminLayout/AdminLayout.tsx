import React, { FC, useState } from 'react'
import { Link, Outlet } from "react-router-dom";
import cn from "classnames";
import styles from './AdminLayout.module.scss'
import { useActions } from "../../../hooks/useActions";
import Logo from '../../../assets/img/headerLogo.svg'
import LogoutImg from '../../../assets/img/logout.svg'
import AdminNavigation from "../AdminNavigation/AdminNavigation";

const AdminLayout: FC = () => {
    const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
    const { logoutUser } = useActions()

    const burgerClickHandler = () => {
        setIsNavOpen(!isNavOpen)
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
                    <AdminNavigation isNavOpen={isNavOpen} />
                </aside>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout