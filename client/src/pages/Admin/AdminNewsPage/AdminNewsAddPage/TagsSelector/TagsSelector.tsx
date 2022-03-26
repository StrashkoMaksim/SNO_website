import styles from "./TagsSelector.module.scss"
import { Tag } from "../../../../../types/tag";
import { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from "react";
import cn from 'classnames'
import closeIcon from '../../../../../assets/img/close.svg'

interface TagsSelectorProps {
    tags: Tag[],
    selectedTags: Set<Tag>
    onInput: (tag: Tag) => void
}


const TagsSelector: FC<TagsSelectorProps> = ({ tags, selectedTags, onInput }) => {

    const [selectorOpened, setSelectorOpened] = useState(false);
    const [autoTags, setAutoTags] = useState<Tag[]>(tags)

    const onSelectorBlur = (value: boolean) => {
        return (e: any) => {
            setTimeout(() => setSelectorOpened(value), 80)
        }
    }

    const onTagSelectorChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!selectorOpened) setSelectorOpened(true)

        let filteredTags: Tag[];

        filteredTags = tags.filter(tag => tag.name.toLowerCase().match(event.target.value.toLowerCase()))
        setAutoTags(filteredTags)
    }

    return (
        <div className={styles.TagsContainer}>
            {Array.from(selectedTags).map(tag =>
                <div key={tag._id} className={styles.tag}>
                    {tag.name}
                    <img className={styles.tag__Remove} onClick={() => onInput(tag)} src={closeIcon} alt='remove tag' />
                </div>)}

            <div className={styles.Selector} >
                <input
                    type="text"
                    className={styles.addBtn}
                    placeholder="Добавить тег"
                    onBlur={onSelectorBlur(false)}
                    onFocus={() => setSelectorOpened(true)}
                    onChange={onTagSelectorChange}
                />
                <div className={cn(styles.MenuItems, { [styles['MenuItems-active']]: selectorOpened })}
                    onClick={() => setSelectorOpened(false)}
                >
                    {autoTags.map(tag =>
                        <button
                            type="button"
                            key={tag._id}
                            className={styles.MenuItems__Single}
                            onClick={() => onInput(tag)}
                        >
                            {tag.name}</button>
                    )}
                </div>
            </div>
        </div >
    )
}

export default TagsSelector;