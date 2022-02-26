import React, {FC} from 'react'
import {createReactEditorJS} from "react-editor-js"
import styles from './Editor.module.scss'
import {useEditor} from "../../hooks/useEditor";

interface EditorProps {
    blocks?: any[],
    onInitialize: void
}

const Editor: FC<EditorProps> = ({blocks = {
    blocks: [
        {
            type: 'paragraph',
            data: {
                text: 'Начните свою историю...',
            }
        },
    ]
}, onInitialize}) => {
    const ReactEditorJS = createReactEditorJS()

    const { editorTools, localization } = useEditor()

    return (
        <div className={styles.editor}>
            <ReactEditorJS onInitialize={onInitialize} defaultValue={blocks} tools={editorTools} i18n={localization}/>
        </div>
    )
}

export default Editor