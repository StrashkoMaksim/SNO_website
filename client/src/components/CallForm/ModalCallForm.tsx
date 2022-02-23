import React, { FC } from "react";
import CallForm from "./CallForm";
import cn from "classnames"
import styles from "./ModalCallForm.module.scss"

interface ModalCallFormProps {
    modalOpened: boolean;
    closeModal: Function
}

const ModalCallForm: FC<ModalCallFormProps> = ({ modalOpened, closeModal }) => {

    return (
        <section className={cn(styles.CallFormWrapper, styles.ModalForm, { [styles['ModalForm-active']]: modalOpened })}>
            <div className={styles.modalInnerContainer} >
                <div className={styles.aroundForm} onClick={() => closeModal()}></div>
                <CallForm hasCloseBtn={true} closeModal={closeModal}></CallForm>
            </div>
        </section >
    )
}

export default ModalCallForm;