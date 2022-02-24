import React, {FC} from 'react'
import {createReactEditorJS} from "react-editor-js"
import styles from './Editor.module.scss'
import {useEditor} from "../../hooks/useEditor";

const Editor: FC<{blocks?: any[]}> = ({ blocks = {
    blocks: [
        {
            type: 'paragraph',
            data: {
                text: 'Начните свою историю...',
            }
        },
    ]
} }) => {
    const ReactEditorJS = createReactEditorJS()

    const { editorTools, localization } = useEditor()

    return (
        <div className={styles.editor}>
            <ReactEditorJS defaultValue={blocks} tools={editorTools} i18n={localization}/>
        </div>
    )
}

export default Editor