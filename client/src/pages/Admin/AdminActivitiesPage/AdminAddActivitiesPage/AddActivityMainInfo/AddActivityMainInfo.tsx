import styles from './AddActivityMainInfo.module.scss'
import { useRef, useCallback, FormEvent, ComponentRef, useState, FC } from 'react'
import cn from 'classnames';
import AdminFormInputText, { AFITStyle } from '../../../../../components/Admin/AdminFormInputText/AdminFormInputText';
import AdminFormInputImg from '../../../../../components/Admin/AdminFormInputImg/AdminFormInputImg';
import Editor, { getEditorContent } from '../../../../../components/Editor/Editor';
import placeholderImg from '../../../../../assets/img/roundPlaceholderImg.png'
import DefaultButton, { ButtonStyles, ButtonTypes } from '../../../../../components/DefaultButton/DefaultButton';
import { FormPages } from '../AdminAddActivitiesPage';
import ErrorMessage from '../../../../../components/ErrorMessage/ErrorMessage';

export const emptyActivityMainInfo = {
    name: '',
    previewText: '',
    logo: '',
    content: [],
}

export interface ActivityMainInfo {
    name: string,
    previewText: string,
    logo: File | Blob | string,
    content: any[],
}

interface AAMIProps {
    handleSectionSubmit: (nextSectionName: FormPages, data: ActivityMainInfo) => void
}


const AddActivityMainInfo: FC<AAMIProps> = ({ handleSectionSubmit }) => {

    const [activityMainInfo, setActivityMainInfo] = useState<ActivityMainInfo>(emptyActivityMainInfo)
    const [errMessage, setErrMessage] = useState<string>('')
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

    const getMainInfoData = async () => {
        const editorContent = await getEditorContent(editorCore)

        if (editorContent.blocks.length === 0) {
            raiseSubmitErr('content')
            return false
        }

        handleSectionSubmit(FormPages.supAndSchedule, { ...activityMainInfo, content: editorContent.blocks })
    }

    const raiseSubmitErr = (emptyField: string) => {
        let errField = ''

        switch (emptyField) {
            case 'name': {
                errField = 'заголовком'
                break
            }
            case 'previewText': {
                errField = 'описанием'
                break
            }
            case 'logo': {
                errField = 'логотипом'
                break
            }
            case 'content': {
                errField = 'общей информацией'
            }
        }

        setErrMessage(`Поле с ${errField} не должно быть пустым!`)

        setTimeout(() => {
            setErrMessage('')
        }, 3000)
    }


    return (
        <div className={cn('admin-add-form', styles.form)}>

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
                    accept='.png'
                    extraClass={styles.logo}
                />
            </div>
            <Editor onInitialize={editorInitializeHandler} />

            <div className={styles.controlButtons}>
                <ErrorMessage errMessage={errMessage} />
                <DefaultButton
                    text="Далее"
                    type={ButtonTypes.button}
                    style={ButtonStyles.adminFilled}
                    onClick={getMainInfoData}
                />
            </div>
        </div>
    )
}

export default AddActivityMainInfo