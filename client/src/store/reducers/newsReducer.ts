import {NewsAction, NewsActionTypes, NewsState} from "../../types/news";

const initialState: NewsState = {
    news: [],
    count: 0,
    loading: false,
    error: null
}

export const newsReducer = (state = initialState, action: NewsAction) : NewsState => {
    switch (action.type) {
        case NewsActionTypes.FETCH_NEWS:
            return { loading: true, error: null, news: [], count: 0}
        case NewsActionTypes.FETCH_NEWS_PREVIEWS_SUCCESS:
            return { loading: false, error: null, news: action.payload.news, count: action.payload.count }
        case NewsActionTypes.FETCH_NEWS_DETAIL_SUCCESS:
            return { loading: false, error: null, news: action.payload, count: 1 }
        case NewsActionTypes.FETCH_NEWS_ERROR:
            return { loading: false, error: action.payload, news: [], count: 0 }
        case NewsActionTypes.CHANGE_NEWS_STATE:
            return { loading: action.payload.loading, error: action.payload.error, news: action.payload.news, count: action.payload.count }
        default:
            return state
    }
}