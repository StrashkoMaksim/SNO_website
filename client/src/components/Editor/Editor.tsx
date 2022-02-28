import React, {FC} from 'react'
import {createReactEditorJS} from "react-editor-js"
import styles from './Editor.module.scss'
import {useEditor} from "../../hooks/useEditor";

interface EditorProps {
    onInitialize: (instance: any) => void
}

const Editor: FC<EditorProps> = ({ onInitialize }) => {
    const ReactEditorJS = createReactEditorJS()
    const { editorTools, localization } = useEditor()

    return (
        <div className={styles.editor}>
            <ReactEditorJS onInitialize={onInitialize}
                           tools={editorTools}
                           i18n={localization}
                           placeholder={'Начните свою историю...'} />
        </div>
    )
}

export default Editor