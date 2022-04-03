import React, { FC } from "react"
import cn from "classnames"
import styles from "./MakeModal.module.scss"
import closeIcon from '../../assets/img/close.svg'

interface ModalCallFormProps {
    modalOpened: boolean
    closeModal: () => void
    children: React.ReactNode
    hasBackground?: boolean
}

const MakeModal: FC<ModalCallFormProps> = ({ modalOpened, closeModal, children, hasBackground = true }) => {
    return (
        <section className={cn(styles.CallFormWrapper, styles.ModalForm, { [styles['ModalForm-active']]: modalOpened })}>
            <div className={styles.aroundForm} onClick={closeModal}></div>
            <div className={cn(styles.modalInnerContainer, { [styles['modalInnerContainer-noBackground']]: !hasBackground })} >
                <button className={styles.close} onClick={closeModal}>
                    <img src={closeIcon} alt="Закрыть" />
                </button>
                {children}
            </div>
        </section >
    )
}

export default MakeModal