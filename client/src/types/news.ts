import {Tag} from "./tag"

export interface NewsState {
    news: News[]
    count: number
    loading: boolean
    error: null | string
}

export enum NewsActionTypes {
    FETCH_NEWS = 'FETCH_NEWS',
    FETCH_NEWS_ERROR = 'FETCH_NEWS_ERROR',
    FETCH_NEWS_PREVIEWS_SUCCESS = 'FETCH_NEWS_PREVIEWS_SUCCESS',
    FETCH_NEWS_DETAIL_SUCCESS = "FETCH_NEWS_DETAIL_SUCCESS",
    CHANGE_NEWS_STATE = 'CHANGE_NEWS_STATE',
}

interface FetchNewsPreviewsAction {
    type: NewsActionTypes.FETCH_NEWS
}

interface FetchNewsPreviewsSuccessAction {
    type: NewsActionTypes.FETCH_NEWS_PREVIEWS_SUCCESS
    payload: {
        news: News[],
        count: number
    }
}

interface FetchNewsDetailSuccessAction {
    type: NewsActionTypes.FETCH_NEWS_DETAIL_SUCCESS
    payload: News[]
}

interface FetchNewsPreviewsErrorAction {
    type: NewsActionTypes.FETCH_NEWS_ERROR
    payload: string
}

interface ChangeNewsStateAction {
    type: NewsActionTypes.CHANGE_NEWS_STATE
    payload: NewsState
}

export type NewsAction = FetchNewsPreviewsAction | FetchNewsPreviewsSuccessAction | FetchNewsPreviewsErrorAction |
    ChangeNewsStateAction | FetchNewsDetailSuccessAction

export type News = {
    _id: string
    title: string
    previewImg: string
    previewText: string
    content: string
    date: string
    tags: Tag[]
}