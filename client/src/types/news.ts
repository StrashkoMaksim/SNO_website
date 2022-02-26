import {Tag} from "./tag";

export interface NewsPreviewsState {
    news: News[];
    loading: boolean;
    error: null | string;
}

export enum NewsActionTypes {
    FETCH_NEWS = 'FETCH_NEWS',
    FETCH_NEWS_ERROR = 'FETCH_NEWS_ERROR',
    FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS'
}

interface FetchNewsPreviewsAction {
    type: NewsActionTypes.FETCH_NEWS
}

interface FetchNewsPreviewsSuccessAction {
    type: NewsActionTypes.FETCH_NEWS_SUCCESS
    payload: News[]
}

interface FetchNewsPreviewsErrorAction {
    type: NewsActionTypes.FETCH_NEWS_ERROR
    payload: string
}

export type NewsAction = FetchNewsPreviewsAction | FetchNewsPreviewsSuccessAction | FetchNewsPreviewsErrorAction

type News = {
    _id: string
    title: string
    previewImg: string
    previewText: string
    content: string
    date: string
    tags: Tag[]
}