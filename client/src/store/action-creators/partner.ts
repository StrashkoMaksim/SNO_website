import {Dispatch} from "redux"
import axios from "axios"
import {PartnerAction, PartnerActionTypes} from "../../types/partner"
import $api from "../../hooks/useProtectedAxios"

export const fetchTags = () => {
    return async (dispatch: Dispatch<PartnerAction>) => {
        try {
            dispatch({ type: PartnerActionTypes.FETCH_PARTNERS })
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/partner`)
            dispatch({ type: PartnerActionTypes.FETCH_PARTNERS_SUCCESS, payload: response.data })
        } catch (e) {
            dispatch({
                type: PartnerActionTypes.FETCH_PARTNERS_ERROR,
                payload: 'Произошла ошибка при загрузке партнеров'
            })
        }
    }
}

export const deleteTag = (tagId: string) => {
    return async (dispatch: Dispatch<PartnerAction>) => {
        try {
            const response = await $api.delete(`/tag/${tagId}`)
            dispatch({ type: PartnerActionTypes.FETCH_PARTNERS_SUCCESS, payload: response.data.partners })
        } catch (e) {
            dispatch({
                type: PartnerActionTypes.FETCH_PARTNERS_ERROR,
                payload: 'Произошла ошибка при удалении партнера'
            })
        }
    }
}

export const addTag = (formData: FormData) => {
    return async (dispatch: Dispatch<PartnerAction>) => {
        try {
            const response = await $api.post('/tag', formData)
            dispatch({ type: PartnerActionTypes.FETCH_PARTNERS_SUCCESS, payload: response.data.partners })
        } catch (e) {
            dispatch({
                type: PartnerActionTypes.FETCH_PARTNERS_ERROR,
                payload: 'Произошла ошибка при добавлении партнера'
            })
        }
    }
}