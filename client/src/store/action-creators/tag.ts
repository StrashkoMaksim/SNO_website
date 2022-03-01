import {Dispatch} from "redux";
import axios from "axios";
import {TagAction, TagActionTypes} from "../../types/tag";

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
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/tag/${tagId}`, {
                headers: {authorization: `Bearer ${localStorage.getItem('token')}`}
            })
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
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/tag`, formData,{
                headers: {authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch({ type: TagActionTypes.FETCH_TAGS_SUCCESS, payload: response.data.tags })
        } catch (e) {
            dispatch({
                type: TagActionTypes.FETCH_TAGS_ERROR,
                payload: 'Произошла ошибка при добавлении тега'
            })
        }
    }
}