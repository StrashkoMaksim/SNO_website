import {NewsAction, NewsActionTypes, NewsState} from "../../types/news"
import {Dispatch} from "redux"
import axios, {AxiosError} from "axios"
import $api from "../../hooks/useProtectedAxios"

export const fetchNewsPreviews = (page = 1, count: Number, tag?: string, search?: string) => {
    return async (dispatch: Dispatch<NewsAction>) => {
        try {
            dispatch({ type: NewsActionTypes.FETCH_NEWS })
            const response = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/api/news?${tag ? `tag=${tag}&`: ''}${search ? `search=${search}` : ''}`,
                {params: {page, count}}
            )
            dispatch({ type: NewsActionTypes.FETCH_NEWS_PREVIEWS_SUCCESS, payload: response.data })
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
            dispatch({ type: NewsActionTypes.FETCH_NEWS_DETAIL_SUCCESS, payload: response.data })
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
            const response = await $api.get(`/news/admin/${id}`)
            dispatch({ type: NewsActionTypes.FETCH_NEWS_DETAIL_SUCCESS, payload: response.data })
        } catch (e) {
            dispatch({
                type: NewsActionTypes.FETCH_NEWS_ERROR,
                payload: 'Произошла ошибка при загрузке новости'
            })
        }
    }
}

export const addNews = (formData: FormData) => {
    return async (dispatch: Dispatch<NewsAction>) => {
        try {
            return await $api.post('/news', formData)
        } catch (e) {
            const error = e as AxiosError
            if (axios.isAxiosError(error)) {
                dispatch({
                    type: NewsActionTypes.FETCH_NEWS_ERROR,
                    payload: error.response?.data.message
                })
            }
        }
    }
}

export const updateNews = (newsId: string, formData: FormData)  => {
    return async (dispatch: Dispatch<NewsAction>) => {
        try {
            return await $api.put<{ message: string }>(`/news/${newsId}`, formData)
        } catch (e) {
            const error = e as AxiosError
            if (axios.isAxiosError(error)) {
                dispatch({
                    type: NewsActionTypes.FETCH_NEWS_ERROR,
                    payload: error.response?.data.message
                })
            }
            return error.response
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
            return await $api.delete(`/news/${id}`)
        } catch (e) {
            dispatch({
                type: NewsActionTypes.FETCH_NEWS_ERROR,
                payload: 'Произошла ошибка при удалении новости'
            })
        }
    }
}