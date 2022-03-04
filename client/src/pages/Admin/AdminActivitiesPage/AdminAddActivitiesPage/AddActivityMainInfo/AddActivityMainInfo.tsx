import styles from './AddActivityMainInfo.module.scss'
import { useRef, useCallback, FormEvent, ComponentRef, useState } from 'react'
import cn from 'classnames';
import Activity from '../../../../../components/Activities/Activity/Activity';
import AdminFormInputText, { AFITStyle } from '../../../../../components/Admin/AdminFormInputText/AdminFormInputText';
import AdminFormInputImg from '../../../../../components/Admin/AdminFormInputImg/AdminFormInputImg';
import Editor from '../../../../../components/Editor/Editor';
import placeholderImg from '../../../../../assets/img/roundPlaceholderImg.png'

const emptyActivityMainInfo = {
    name: '',
    previewText: '',
    logo: '',
    content: '',
}

interface ActivityMainInfo {
    name: string,
    previewText: string,
    logo: File | Blob | string,
    content: string,
}

const AddActivityMainInfo = () => {

    const [activityMainInfo, setActivityMainInfo] = useState<ActivityMainInfo>(emptyActivityMainInfo)

    const onChangeTextInputsHandle = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const inputName = e.currentTarget.name;
        const inputValue = e.currentTarget.value;

        setActivityMainInfo(prevState => ({ ...prevState, [inputName]: inputValue }))
    }

    const onPreviewImgLoad = (event: any) => {
        const img = event.target.files[0];
        setActivityMainInfo(prevState => ({ ...prevState, logo: img }))
    }

    const editorCore = useRef<ComponentRef<any>>(null)

    const editorInitializeHandler = useCallback((instance) => {
        editorCore.current = instance
    }, [])


    return (
        <div className={cn(styles['admin-add-form'], styles.form)}>
            <div className={styles.mainInputs}>
                <div className={styles.mainInputs__TextInputs}>
                    <AdminFormInputText
                        style={AFITStyle.textarea}
                        placeholder="Заголовок"
                        name="name"
                        value={activityMainInfo.name}
                        onChange={onChangeTextInputsHandle}
                        extraClass={styles['input-name']}
                        required
                    />

                    <AdminFormInputText
                        style={AFITStyle.textarea}
                        placeholder="Описание"
                        name="previewText"
                        value={activityMainInfo.previewText}
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
    )
}

export default AddActivityMainInfo