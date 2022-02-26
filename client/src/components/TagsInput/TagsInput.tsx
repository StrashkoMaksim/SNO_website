import React, {FC, FormEvent} from 'react';
import {Tag} from "../../types/tag";
import styles from './TagsInputs.module.scss'
import cn from "classnames";

interface TagsInputProps {
    tags: Tag[],
    selectedTags: Set<string>
    onInput: (e: FormEvent<HTMLInputElement>) => void
}

const TagsInput: FC<TagsInputProps> = ({ tags, selectedTags , onInput}) => {


    return (
        <div className={styles.TagsInput}>
            {tags.length > 0 ? tags.map(tag => {
                return (
                    <label className={cn(styles.label, {[styles.active]: selectedTags.has(tag._id)})} key={tag._id}>
                        <input type="checkbox" name="tags" value={tag._id} className="visually-hidden" onInput={onInput} />
                        <span>{tag.name}</span>
                    </label>
                )
            }):
                <p>Доступные теги отсутствуют</p>
            }
        </div>
    );
};

export default TagsInput;