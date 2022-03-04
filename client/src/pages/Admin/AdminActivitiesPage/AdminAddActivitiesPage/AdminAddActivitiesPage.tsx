import DefaultButton, { ButtonStyles, ButtonTypes } from "../../../../components/DefaultButton/DefaultButton";
import LinkBack from "../../../../components/LinkBack/LinkBack";
import styles from './AdminAddActivitiesPage.module.scss'
import deleteIcon from '../../../../assets/img/red_trash.svg'
import { ComponentRef, FormEvent, useState } from "react";
import AdminFormInputText, { AFITStyle } from "../../../../components/Admin/AdminFormInputText/AdminFormInputText";
import AdminFormInputImg from "../../../../components/Admin/AdminFormInputImg/AdminFormInputImg";
import placeholderImg from '../../../../assets/img/roundPlaceholderImg.png'
import cn from "classnames";
import Editor, { getEditorContent } from "../../../../components/Editor/Editor";
import React from "react";
import AdminAddSupervisorForm from "../../../../components/Admin/AdminAddSupervisorForm/AdminAddSupervisorForm";
import SchedulePicker from "./SchedulePicker/SchedulePicker";
import {ScheduleIntefrace} from '../../../../types/schedule'

interface Activity {
    name: string,
    previewText: string,
    logo: string | Blob | File,
    supervisor: {
        fio: string,
        department: string,
        position: string,
        phone: string
    }
    supervisorPhoto: string | Blob | File,
    content: string,
    schedule: ScheduleIntefrace[]
}

const emptyActivity = {
    name: '',
    previewText: '',
    logo: '',
    supervisor: {
        fio: '',
        department: '',
        position: '',
        phone: ''
    },
    supervisorPhoto: '',
    content: '',
    schedule: []
}

const AdminAddActivitiesPage = () => {

    const activityId = undefined;
    const [activity, setActivity] = useState<Activity>(emptyActivity)

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log(activity)

        const formData = new FormData(e.currentTarget)

        const editorData = await getEditorContent(editorCore);

        // @ts-ignore
        for (var pair of editorData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        // @ts-ignore
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
    }

    const onChangeTextInputsHandle = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const inputName = e.currentTarget.name;
        const inputValue = e.currentTarget.value;

        setActivity(prevState => ({ ...prevState, [inputName]: inputValue }))
    }

    const onPreviewImgLoad = (event: any) => {
        const img = event.target.files[0];
        setActivity(prevState => ({ ...prevState, logo: img }))
    }

    const editorCore = React.useRef<ComponentRef<any>>(null)

    const editorInitializeHandler = React.useCallback((instance) => {
        editorCore.current = instance
    }, [])

    return (
        <>

            {/* Это можно вынести в отдельный компонент */}

            <LinkBack to="/admin/activities" text="Вернуться к списку кружков" />
            <div className={styles.adminHeader}>
                <h1 className={styles.adminH1}>
                    {activityId ? 'Редактировать кружок' : 'Добавить кружок'}
                </h1>
                {activityId &&
                    <div className={styles.btns}>
                        <DefaultButton
                            text="Удалить новость"
                            imgSrc={deleteIcon}
                            style={ButtonStyles.outlined}
                            type={ButtonTypes.button}
                        // onClick={onDeleteHandler}
                        />
                    </div>
                }
            </div>


            <form className={styles.AddActivityForm} onSubmit={submitHandler}>

                {/* По хорошему переименовать класс а еще лучше - вынести в другой компонент */}
                <div className={cn(styles['admin-add-form'], styles.form)}>
                    <div className={styles.mainInputs}>
                        <div className={styles.mainInputs__TextInputs}>
                            <AdminFormInputText
                                style={AFITStyle.textarea}
                                placeholder="Заголовок"
                                name="name"
                                value={activity.name}
                                onChange={onChangeTextInputsHandle}
                                extraClass={styles['input-name']}
                                required
                            />

                            <AdminFormInputText
                                style={AFITStyle.textarea}
                                placeholder="Описание"
                                name="previewText"
                                value={activity.previewText}
                                onChange={onChangeTextInputsHandle}
                                extraClass={styles['input-previewText']}
                                required
                            />
                        </div>

                        <AdminFormInputImg
                            name="previewImg"
                            onChange={onPreviewImgLoad}
                            defaultImg={placeholderImg}
                            id='activityLogoInputImg'
                            extraClass={styles.logo}
                        />
                    </div>
                    <Editor onInitialize={editorInitializeHandler} />
                </div>

                <AdminAddSupervisorForm />

                <SchedulePicker />

                <DefaultButton
                    text="Сохранить новость"
                    style={ButtonStyles.filled}
                    type={ButtonTypes.submit}
                    extraClass={styles.alignSelfCenter}
                />
            </form>

        </>
    )
}

export default AdminAddActivitiesPage;