import {NewsAction, NewsActionTypes, NewsState} from "../../types/news";
import {Dispatch} from "redux";
import axios from "axios";
import $api from "../../hooks/useProtectedAxios";

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
            dispatch({ type: NewsActionTypes.FETCH_NEWS_SUCCESS, payload: [response.data] })
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
            const response = await $api.get(`${process.env.REACT_APP_SERVER_URL}/api/news/admin/${id}`)
            dispatch({ type: NewsActionTypes.FETCH_NEWS_SUCCESS, payload: [response.data] })
        } catch (e) {
            dispatch({
                type: NewsActionTypes.FETCH_NEWS_ERROR,
                payload: 'Произошла ошибка при загрузке новости'
            })
        }
    }
}

export const changeNewsState = (newsState: NewsState) => {
    return async (dispatch: Dispatch<NewsAction>) => {
        dispatch({ type: NewsActionTypes.CHANGE_NEWS_STATE, payload: newsState })
    }
}

export const deleteNews = (id: string) => {
    return async (dispatch: Dispatch<NewsAction>) => {
        try {
            return await $api.delete(`${process.env.REACT_APP_SERVER_URL}/api/news/${id}`)
        } catch (e) {
            dispatch({
                type: NewsActionTypes.FETCH_NEWS_ERROR,
                payload: 'Произошла ошибка при удалении новости'
            })
        }
    }
}