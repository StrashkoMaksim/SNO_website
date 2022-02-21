import Header from "../Header/Header";
import styles from "./MainLayout.module.scss"

export interface Props {
    children?: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
    return (
        <div className={styles.MainLayoutWrapper}>
            <div className={styles.Container + " " + styles.BoxShadow} >
                <Header />
            </div>

            <div className={styles.Container} style={{ 'backgroundColor': '#EFF3EB' }}>
                {children}
            </div>
            {/* Форма */}
            {/* Футер */}
        </div>
    )
}

export default MainLayout;