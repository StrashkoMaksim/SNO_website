import React, { ComponentRef, FC, forwardRef, useImperativeHandle } from 'react'
import { createReactEditorJS } from "react-editor-js"
import styles from './Editor.module.scss'
import { useEditor } from "../../hooks/useEditor";
import './EditorStylesReset.scss'



interface EditorProps {
    onInitialize: (instance: any) => void
    editorRef?: any
}

export const getEditorContent = async (editorRef: any) => {

    const editorData = new FormData()

    // @ts-ignore
    await editorRef.current.save()
        .then(async (content: any) => {

            for (const block of content.blocks) {

                if (block.type === 'image') {

                    if (block.data.file.source) {
                        editorData.set('contentImages', block.data.file.source)
                        block.data.file = undefined
                    } else {
                        const file = await fetch(block.data.file.url).then(r => r.blob())
                        editorData.set('contentImages', file, block.id + '.jpg')
                    }

                }
            }
            return content;
        }
        )
        .then((content: any) => { editorData.set('content', JSON.stringify(content.blocks)) })

    return editorData
};



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