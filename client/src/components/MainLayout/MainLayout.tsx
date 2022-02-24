import React from "react";
import Header from "../Header/Header";
import styles from "./MainLayout.module.scss"
import CallForm from "../../components/CallForm/CallForm"
import Footer from "../Footer/Footer";

export interface Props {
    children?: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {

    return (
        <div className={styles.MainLayout}>
            <Header />
            <div className={styles.MainLayout__Content}>
                {children}
            </div>
            <CallForm />
            <Footer />
        </div>
    )
}

export default MainLayout;