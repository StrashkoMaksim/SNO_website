export interface NewsPreviewsState {
    news: News[];
    loading: boolean;
    error: null | string;
}

export enum NewsActionTypes {
    FETCH_NEWS_PREVIEWS = 'FETCH_NEWS_PREVIEWS',
    FETCH_NEWS_PREVIEWS_ERROR = 'FETCH_NEWS_PREVIEWS_ERROR',
    FETCH_NEWS_PREVIEWS_SUCCESS = 'FETCH_NEWS_PREVIEWS_SUCCESS'
}

interface FetchNewsPreviewsAction {
    type: NewsActionTypes.FETCH_NEWS_PREVIEWS
}

interface FetchNewsPreviewsSuccessAction {
    type: NewsActionTypes.FETCH_NEWS_PREVIEWS_SUCCESS
    payload: News[]
}

interface FetchNewsPreviewsErrorAction {
    type: NewsActionTypes.FETCH_NEWS_PREVIEWS_ERROR
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

type Tag = {
    _id: string
    name: string
}