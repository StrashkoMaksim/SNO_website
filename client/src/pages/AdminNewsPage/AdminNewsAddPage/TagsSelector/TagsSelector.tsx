import styles from "./TagsSelector.module.scss"
import { Tag } from "../../../../types/tag";
import { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from "react";
import cn from 'classnames'
import closeIcon from '../../../../assets/img/close.svg'

interface TagsSelectorProps {
    tags: Tag[],
    selectedTags: Set<string>
    onInput: (name: string) => void
}


const TagsSelector: FC<TagsSelectorProps> = ({ tags, selectedTags, onInput }) => {

    const [selectorOpened, setSelectorOpened] = useState(false);
    const [autoTags, setAutoTags] = useState<string[]>([])
    const tagNames = tags.map(tag => tag.name)

    const closeSelector = () => {
        setSelectorOpened(false)
    }

    const onTagSelectorChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!selectorOpened) setSelectorOpened(true)

        let filteredTags: string[];

        // Если запрос пустой
        event.target.value == "" ? filteredTags = [] :
            filteredTags = tagNames.filter(tag => tag.toLowerCase().match(event.target.value.toLowerCase()))

        setAutoTags(filteredTags)
    }

    return (
        <div className={styles.TagsContainer}>
            {Array.from(selectedTags).map(tag =>
                <div key={tag} className={styles.tag}>
                    {tag}
                    <img className={styles.tag__Remove} onClick={() => onInput(tag)} src={closeIcon} alt='remove tag' />
                </div>)}
            <div className={styles.Selector}>
                <input
                    type="text"
                    className={styles.addBtn}
                    placeholder="Добавить тег"
                    onChange={onTagSelectorChange}
                />
                <div className={cn(styles.MenuItems, { [styles['MenuItems-active']]: selectorOpened })}
                    onClick={closeSelector}>
                    {autoTags.map(tag =>
                        <button
                            type="button"
                            key={tag}
                            className={styles.MenuItems__Single}
                            onClick={() => onInput(tag)}
                        >
                            {tag}</button>
                    )}
                </div>
            </div>
        </div >
    )
}

export default TagsSelector;