export type Tag = {
    _id: string
    name: string
}

export interface TagState {
    tags: Tag[];
    loading: boolean;
    error: null | string;
}

export enum TagActionTypes {
    FETCH_TAGS = 'FETCH_TAGS',
    FETCH_TAGS_ERROR = 'FETCH_TAGS_ERROR',
    FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS'
}

interface FetchTagsAction {
    type: TagActionTypes.FETCH_TAGS
}

interface FetchTagsSuccessAction {
    type: TagActionTypes.FETCH_TAGS_SUCCESS
    payload: Tag[]
}

interface FetchTagsErrorAction {
    type: TagActionTypes.FETCH_TAGS_ERROR
    payload: string
}

export type TagAction = FetchTagsAction | FetchTagsSuccessAction | FetchTagsErrorAction