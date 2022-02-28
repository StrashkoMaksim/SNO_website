import {NewsAction, NewsActionTypes, NewsPreviewsState} from "../../types/news";

const initialState: NewsPreviewsState = {
    news: [],
    loading: false,
    error: null
}

export const newsReducer = (state = initialState, action: NewsAction) : NewsPreviewsState => {
    switch (action.type) {
        case NewsActionTypes.FETCH_NEWS:
            return { loading: true, error: null, news: []}
        case NewsActionTypes.FETCH_NEWS_SUCCESS:
            return { loading: false, error: null, news: action.payload}
        case NewsActionTypes.FETCH_NEWS_ERROR:
            return { loading: false, error: action.payload, news: []}
        case NewsActionTypes.CHANGE_NEWS_STATE:
            return { loading: action.payload.loading, error: action.payload.error, news: action.payload.news}
        default:
            return state
    }
}