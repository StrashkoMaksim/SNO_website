import React, { FC } from 'react'
import { createReactEditorJS } from "react-editor-js"
import styles from './Editor.module.scss'
import { useEditor } from "../../hooks/useEditor";
import './EditorStylesReset.scss'

interface EditorProps {
    onInitialize: (instance: any) => void
    editorRef?: any
}

export const getEditorContent = async (editorRef: any) => {
    return await editorRef.current.save()
}

export const setEditorContent = async (editorRef: any, content: any[] | string) => {
    let blocks: any[]

    if (typeof content === 'string') {
        blocks = JSON.parse(content)
    } else {
        blocks = content
    }

    for (const block of blocks) {
        if (block.type === 'image') {
            if (!block.data.file) {
                block.data.file = { url: `${process.env.REACT_APP_SERVER_URL}/${block.data.src}` }
            }
        }
    }

    setTimeout(() => {
        editorRef.current._editorJS.render({ blocks })
    }, 1000)
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