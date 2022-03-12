import {Dispatch} from "redux"
import axios from "axios"
import {TagAction, TagActionTypes} from "../../types/tag"
import $api from "../../hooks/useProtectedAxios"

export const fetchTags = () => {
    return async (dispatch: Dispatch<TagAction>) => {
        try {
            dispatch({ type: TagActionTypes.FETCH_TAGS })
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/tag`)
            dispatch({ type: TagActionTypes.FETCH_TAGS_SUCCESS, payload: response.data })
        } catch (e) {
            dispatch({
                type: TagActionTypes.FETCH_TAGS_ERROR,
                payload: 'Произошла ошибка при загрузке тегов'
            })
        }
    }
}

export const deleteTag = (tagId: string) => {
    return async (dispatch: Dispatch<TagAction>) => {
        try {
            const response = await $api.delete(`${process.env.REACT_APP_SERVER_URL}/api/tag/${tagId}`)
            dispatch({ type: TagActionTypes.FETCH_TAGS_SUCCESS, payload: response.data.tags })
        } catch (e) {
            dispatch({
                type: TagActionTypes.FETCH_TAGS_ERROR,
                payload: 'Произошла ошибка при удалении тега'
            })
        }
    }
}

export const addTag = (formData: FormData) => {
    return async (dispatch: Dispatch<TagAction>) => {
        try {
            const response = await $api.post(`${process.env.REACT_APP_SERVER_URL}/api/tag`, formData)
            dispatch({ type: TagActionTypes.FETCH_TAGS_SUCCESS, payload: response.data.tags })
        } catch (e) {
            dispatch({
                type: TagActionTypes.FETCH_TAGS_ERROR,
                payload: 'Произошла ошибка при добавлении тега'
            })
        }
    }
}