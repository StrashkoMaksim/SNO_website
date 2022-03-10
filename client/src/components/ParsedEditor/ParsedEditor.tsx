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
        src?: string
        caption?: string
    }
}

interface ParsedEditorProps {
    content: any[]
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

    const scriptRegex = new RegExp('<script.*> ', 'gm')
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
                        return <h2 className={styles.subHeader} key={block.id}>{block.data.text}</h2>
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
                    case 'image':
                        return <div key={block.id} className={styles.imgAndCaption}>
                            <img src={`${process.env.REACT_APP_SERVER_URL}/${block.data.src}`} />
                            <p className={styles.caption}>{block.data.caption}</p>
                        </div>
                    default: return <div key={block.id}></div>
                }
            })}
        </div >
    )
}

export default ParsedEditor