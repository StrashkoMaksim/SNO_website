import React, { FC } from "react";
import cn from "classnames"
import styles from "./MakeModal.module.scss"

interface ModalCallFormProps {
    modalOpened: boolean
    closeModal: Function
    children: React.ReactNode
}

const MakeModal: FC<ModalCallFormProps> = ({ modalOpened, closeModal, children }) => {

    return (
        <section className={cn(styles.CallFormWrapper, styles.ModalForm, { [styles['ModalForm-active']]: modalOpened })}>
            <div className={styles.modalInnerContainer} >
                <div className={styles.aroundForm} onClick={() => closeModal()}></div>
                {children}
            </div>
        </section >
    )
}

export default MakeModal;