import React from "react"
import checkMark from "../../assets/img/checkMark.svg"
import regIcon from "../../assets/img/RegistrationIcon.svg"
import styles from "./RegistrationPage.module.scss"
import cn from "classnames"
import DefaultButton, { ButtonStyles, ButtonTypes } from "../../components/DefaultButton/DefaultButton";
import CustomCheckBox from "../../components/CustomCheckBox/CustomCheckBox";

const RegistrationPage = () => {

    const defaultFormData = {
        fio: "",
        group: "",
        hobbies: {},
        otherHobbies: "",
        about: ""
    }

    const [formSubmitted, setFormSubmitted] = React.useState<boolean>(false);
    const [formData, setFormData] = React.useState(defaultFormData)

    const handleSumbit = (event: any) => {
        event.preventDefault()
        const { target } = event;

        console.log(formData)
        setFormSubmitted(true)
        setTimeout(() => setFormSubmitted(false), 3000)

        target.reset();

        // Отправить formData куда надо
    }

    const onChangeInput = (event: React.FormEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        setFormData({ ...formData, [name]: value })
    }


    const onChangeTextarea = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        setFormData({ ...formData, [name]: value })
    }

    const onCheckBoxChange = (name: string, value: boolean) => {
        const newHobbies = { ...formData.hobbies, [name]: value }
        setFormData({ ...formData, hobbies: newHobbies })
    }

    return (
        <section className={cn('section')}>
            <div className={cn('container')}>
                <h1>Регистрация участника</h1>
                <div className={styles.RegistrationInfo}>
                    <img src={regIcon} alt="registration icon" />
                    <p className={styles.Regular}>Регистрация участника позволяет нам получить информацию об актуальности наших кружков для
                        студентов ДВГУПС, благодаря чему появляется возможность перераспределить расписание и
                        рассмотреть возможность добавления новых кружков.</p>
                </div>
                <form className={styles.RegistrationForm} onSubmit={handleSumbit}>
                    <div className={cn(styles.checkMark, { [styles['checkMark-active']]: formSubmitted })}>
                        <img src={checkMark} alt="check mark icon" />
                        <span>Отправлено!</span>
                    </div>
                    <div className={styles.RegistrationForm__Inputs}>
                        <label htmlFor="fio" className={styles.labeledInput}>
                            <span>ФИО</span>
                            <input
                                className={styles.input}
                                type='text'
                                name="fio"
                                placeholder="Иван"
                                pattern="[А-Яа-я ]+"
                                required
                                onChange={onChangeInput}
                                maxLength={70}
                            ></input>
                        </label>

                        <label htmlFor="group" className={styles.labeledInput}>
                            <span>Группа</span>
                            <input
                                className={styles.input}
                                type='text'
                                name="group"
                                placeholder="БО941ПРИ"
                                pattern="[А-Яа-я0-9 ]+"
                                required
                                onChange={onChangeInput}
                                maxLength={20}
                            ></input>
                        </label>
                        <fieldset className={styles.Hobbies}>
                            <legend className={styles.HobbiesLabel}>Интересы</legend>
                            <CustomCheckBox label="VR технологии" name="VR" onChange={onCheckBoxChange} reset={formSubmitted} />
                            <CustomCheckBox label="AR технологии" name="AR" onChange={onCheckBoxChange} reset={formSubmitted} />
                            <CustomCheckBox label="WEB-разработка" name="WEB" onChange={onCheckBoxChange} reset={formSubmitted} />
                            <CustomCheckBox label="Программирование" name="Programming" onChange={onCheckBoxChange} reset={formSubmitted} />
                            <CustomCheckBox label="3D моделирование" name="3D-modeling" onChange={onCheckBoxChange} reset={formSubmitted} />
                            <CustomCheckBox label="Дизайн" name="Design" onChange={onCheckBoxChange} reset={formSubmitted} />
                            <CustomCheckBox label="3D печать" name="3D-printing" onChange={onCheckBoxChange} reset={formSubmitted} />
                            <CustomCheckBox label="SMM" name="SMM" onChange={onCheckBoxChange} reset={formSubmitted} />
                        </fieldset>
                        <fieldset className={styles.Hobbies} id={styles.HobbiesSecond}>
                            <CustomCheckBox label="Нейросети, ИИ" name="AI" onChange={onCheckBoxChange} reset={formSubmitted} />
                            <CustomCheckBox label="AR технологии" name="AR" onChange={onCheckBoxChange} reset={formSubmitted} />
                            <CustomCheckBox label="WEB-разработка" name="WEB" onChange={onCheckBoxChange} reset={formSubmitted} />
                            <CustomCheckBox label="Программирование" name="Programming" onChange={onCheckBoxChange} reset={formSubmitted} />
                            <CustomCheckBox label="3D моделирование" name="3D-modeling" onChange={onCheckBoxChange} reset={formSubmitted} />
                            <CustomCheckBox label="Дизайн" name="Design" onChange={onCheckBoxChange} reset={formSubmitted} />
                            <CustomCheckBox label="3D печать" name="3D-printing" onChange={onCheckBoxChange} reset={formSubmitted} />
                            <CustomCheckBox label="SMM" name="SMM" onChange={onCheckBoxChange} reset={formSubmitted} />
                        </fieldset>
                        <label htmlFor="otherHobbies" className={styles.labeledInput} id={styles.textAreaBlock}>
                            <span>Другие интересы</span>
                            <textarea
                                className={styles.textarea}
                                name="otherHobbies"
                                placeholder="Ваших интересов нет выше? Напишите о них здесь..."
                                onChange={onChangeTextarea}
                                maxLength={140}
                            ></textarea>
                        </label>
                        <label htmlFor="about" className={styles.labeledInput} id={styles.textAreaBlock}>
                            <span>О себе</span>
                            <textarea
                                className={styles.textarea}
                                name="about"
                                placeholder="Коротко расскажите о себе"
                                required
                                onChange={onChangeTextarea}
                                maxLength={140}
                            ></textarea>
                        </label>
                    </div>
                    <DefaultButton text="Отправить" style={ButtonStyles.filled} type={ButtonTypes.submit} />
                </form>
            </div>
        </section>
    )
}

export default RegistrationPage;