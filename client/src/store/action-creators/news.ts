import {NewsAction, NewsActionTypes, NewsPreviewsState} from "../../types/news";
import {Dispatch} from "redux";
import axios from "axios";

export const fetchNewsPreviews = (page = 1, count: Number) => {
    return async (dispatch: Dispatch<NewsAction>) => {
        try {
            dispatch({ type: NewsActionTypes.FETCH_NEWS })
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/news`, {
                params: {page, count}
            })
            dispatch({ type: NewsActionTypes.FETCH_NEWS_SUCCESS, payload: response.data })
        } catch (e) {
            dispatch({
                type: NewsActionTypes.FETCH_NEWS_ERROR,
                payload: 'Произошла ошибка при загрузке новостей'
            })
        }
    }
}

export const fetchNewsDetail = (id: string) => {
    return async (dispatch: Dispatch<NewsAction>) => {
        try {
            dispatch({ type: NewsActionTypes.FETCH_NEWS })
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/news/${id}`)
            dispatch({ type: NewsActionTypes.FETCH_NEWS_SUCCESS, payload: response.data })
        } catch (e) {
            dispatch({
                type: NewsActionTypes.FETCH_NEWS_ERROR,
                payload: 'Произошла ошибка при загрузке новости'
            })
        }
    }
}

export const fetchNewsAdmin = (id: string) => {
    return async (dispatch: Dispatch<NewsAction>) => {
        try {
            dispatch({ type: NewsActionTypes.FETCH_NEWS })
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/news/admin/${id}`,
                {
                    headers: {authorization: `Bearer ${localStorage.getItem('token')}`}
                })
            dispatch({ type: NewsActionTypes.FETCH_NEWS_SUCCESS, payload: [response.data] })
        } catch (e) {
            dispatch({
                type: NewsActionTypes.FETCH_NEWS_ERROR,
                payload: 'Произошла ошибка при загрузке новости'
            })
        }
    }
}

export const changeNewsState = (newsState: NewsPreviewsState) => {
    return async (dispatch: Dispatch<NewsAction>) => {
        dispatch({ type: NewsActionTypes.CHANGE_NEWS_STATE, payload: newsState })
    }
}