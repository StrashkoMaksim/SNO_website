import { FC, useEffect, useState } from 'react'
import styles from './ParsedEditor.module.scss'

interface EditorBlock {
    id: string,
    type: string,
    data: {
        text?: string,
        style?: string,
        items?: string[]
        level?: number
    }
}

interface ParsedEditorProps {
    content: FormDataEntryValue | null
}

const ParsedEditor: FC<ParsedEditorProps> = ({ content }) => {

    const [editorBlocks, setEditorBlocks] = useState<EditorBlock[]>([])

    useEffect(() => {
        if (typeof content === 'string') {
            const blocks = JSON.parse(content)
            setEditorBlocks(blocks)
            console.log(blocks)

        }
    }, [content])

    // На всякий случай избавляемся от любых тегов <script> из параграфа,
    // перед тем как вставить его в innerHTML

    const scriptRegex = new RegExp('<script.*>', 'gm')
    const parseParagraph = (paragraph: string | undefined) => {
        return paragraph?.replace(scriptRegex, '') + ''
    }

    return (
        <div className={styles.EditorData}>
            {editorBlocks.map(block => {
                switch (block.type) {
                    case 'paragraph':
                        return <div key={block.id} dangerouslySetInnerHTML={{ __html: parseParagraph(block.data.text) }}></div>
                    case 'header':
                        return <h2 key={block.id}>{block.data.text}</h2>
                    case 'list':
                        return block.data.style === 'ordered' ?
                            <ol key={block.id}>
                                {block.data.items?.map((item, index) =>
                                    <li key={index}>{item}</li>
                                )}
                            </ol>
                            :
                            <ul key={block.id}>
                                {block.data.items?.map((item, index) =>
                                    <li key={index}>{item}</li>
                                )}
                            </ul>
                    default: return <div key={block.id}></div>
                }
            })}
        </div >
    )
}

export default ParsedEditor