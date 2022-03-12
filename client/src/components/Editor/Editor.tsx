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

export const setEditorContent = async (editorRef: any, content: any[]) => {
    const blocks = JSON.parse(content?.toString())
    // @ts-ignore
    blocks.forEach(async block => {
        if (block.type === 'image') {
            block.data.file = { url: `${process.env.REACT_APP_SERVER_URL}/${block.data.src}` }
        }
    })

    setTimeout(() => {
        // @ts-ignore
        editorRef.current?.render({ blocks })
    }, 500)
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