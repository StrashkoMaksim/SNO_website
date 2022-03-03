import DefaultButton, { ButtonStyles, ButtonTypes } from "../../../../components/DefaultButton/DefaultButton";
import LinkBack from "../../../../components/LinkBack/LinkBack";
import styles from './AdminAddActivitiesPage.module.scss'
import deleteIcon from '../../../../assets/img/red_trash.svg'
import { ComponentRef, FormEvent, useState } from "react";
import AdminFormInputText, { AFITStyle } from "../../../../components/Admin/AdminFormInputText/AdminFormInputText";
import AdminFormInputImg from "../../../../components/Admin/AdminFormInputImg/AdminFormInputImg";
import placeholderImg from '../../../../assets/img/roundPlaceholderImg.png'
import cn from "classnames";
import Editor from "../../../../components/Editor/Editor";
import React from "react";

interface Activity {
    title: string,
    previewText: string,
    logo: string | Blob,
}

const emptyActivity = {
    title: '',
    previewText: '',
    logo: ''
}

const AdminAddActivitiesPage = () => {

    const activityId = undefined;
    const [activity, setActivity] = useState<Activity>(emptyActivity)

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {

    }

    const onChangeTextInputsHandle = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const inputName = e.currentTarget.name;
        const inputValue = e.currentTarget.value;


        setActivity(prevState => ({ ...prevState, [inputName]: inputValue }))

    }

    const onPreviewImgLoad = (event: any) => {
        const img = event.target.files[0];
        setActivity(activity.logo = img)
    }

    const editorCore = React.useRef<ComponentRef<any>>(null)

    const editorInitializeHandler = React.useCallback((instance) => {
        editorCore.current = instance
    }, [])

    const getEditorContent = React.useCallback(async () => {
        // @ts-ignore
        return await editorCore.current.save();
    }, [])

    return (
        <>
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


            <form className={cn(styles['admin-add-form'], styles.form)} onSubmit={submitHandler}>

                <div className={styles.mainInputs}>
                    <div className={styles.mainInputs__TextInputs}>
                        <AdminFormInputText
                            style={AFITStyle.textarea}
                            placeholder="Заголовок"
                            name="name"
                            value={activity.title}
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
                        extraClass={styles.logo}
                    />
                </div>

                <Editor onInitialize={editorInitializeHandler} />


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