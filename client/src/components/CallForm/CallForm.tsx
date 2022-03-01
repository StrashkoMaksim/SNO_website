import React, { FC } from "react";
import cn from "classnames";
import styles from './CallForm.module.scss'
import DefaultButton, { ButtonStyles, ButtonTypes } from "../DefaultButton/DefaultButton";
import checkMark from "../../assets/img/checkMark.svg"
import xMark from "../../assets/img/xMark.svg"

interface CallFormProps {
    modal?: boolean
    closeModal?: Function
}

const CallForm: FC<CallFormProps> = ({ modal, closeModal }) => {

    const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);

    const handleSumbit = (event: any) => {
        event.preventDefault()
        const { target } = event;
        const data: any = new FormData(target);

        data.append('Имя', target.name.value)
        data.append('Номер телефона', target.phoneNumber.value)
        data.append('Вопрос', target.question.value)

        setFormSubmitted(true)
        setTimeout(() => setFormSubmitted(false), 3000)

        target.reset();

        // Отправить data куда надо
    }

    return (
        <section className={cn('section', styles.CallFormWrapper, { [styles.modal]: modal })}>
            <div className={cn('container')}>
                <h1>Возникли трудности?</h1>
                <form className={styles.CallForm} onSubmit={handleSumbit}>

                    <div className={cn(styles.checkMark, { [styles['checkMark-active']]: formSubmitted })}>
                        <img src={checkMark} alt="check mark icon" />
                        <span>Отправлено!</span>
                    </div>
                    <p className={cn(styles.formTitle, styles.Regular)}>Задайте нам вопрос, заполнив форму ниже.</p>
                    <div className={styles.CallForm__Inputs}>
                        <label htmlFor="name" className={styles.labeledInput}>
                            <span>Ваше имя</span>
                            <input
                                className={styles.input}
                                type='text'
                                name="name"
                                placeholder="Иван"
                                pattern="[А-Яа-я ]+"
                                required
                            ></input>
                        </label>

                        <label htmlFor="phoneNumber" className={styles.labeledInput}>
                            <span>Номер телефона</span>
                            <input
                                className={styles.input}
                                type='text'
                                name="phoneNumber"
                                placeholder="8 (999) 100 20 30"
                                pattern="(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})"
                                required
                            ></input>
                        </label>
                        <label htmlFor="question" className={styles.labeledInput} id={styles.textAreaBlock}>
                            <span>Ваш вопрос</span>
                            <textarea
                                className={styles.textarea}
                                name="question"
                                placeholder="Проблемы с отображением блока ..."
                                required
                            ></textarea>
                        </label>
                    </div>
                    <DefaultButton text="Отправить" style={ButtonStyles.filled} type={ButtonTypes.submit} />
                </form>
            </div>
        </section >
    )
}

export default CallForm;