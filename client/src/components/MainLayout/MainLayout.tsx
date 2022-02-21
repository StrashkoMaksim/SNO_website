import Header from "../Header/Header";
import styles from "./MainLayout.module.scss"

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
            {/* Форма */}
            {/* Футер */}
        </div>
    )
}

export default MainLayout;