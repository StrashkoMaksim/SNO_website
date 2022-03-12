import { ActivityAction, ActivityActionTypes, ActivityState } from "../../types/activity"
import { Dispatch } from "redux"
import axios from "axios"
import $api from "../../hooks/useProtectedAxios";

export const fetchActivityPreviews = () => {
    return async (dispatch: Dispatch<ActivityAction>) => {
        try {
            dispatch({ type: ActivityActionTypes.FETCH_ACTIVITIES })
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/section`)
            dispatch({ type: ActivityActionTypes.FETCH_ACTIVITIES_SUCCESS, payload: response.data })
        } catch (e) {
            dispatch({
                type: ActivityActionTypes.FETCH_ACTIVITIES_ERROR,
                payload: 'Произошла ошибка при загрузке кружков'
            })
        }
    }
}

export const fetchActivityDetail = (id: string) => {
    return async (dispatch: Dispatch<ActivityAction>) => {
        try {
            dispatch({ type: ActivityActionTypes.FETCH_ACTIVITIES })
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/section/${id}`)
            dispatch({ type: ActivityActionTypes.FETCH_ACTIVITIES_SUCCESS, payload: [response.data] })
        } catch (e) {
            dispatch({
                type: ActivityActionTypes.FETCH_ACTIVITIES_ERROR,
                payload: 'Произошла ошибка при загрузке кружков'
            })
        }
    }
}

export const changeActivityState = (newsState: ActivityState) => {
    return async (dispatch: Dispatch<ActivityAction>) => {
        dispatch({ type: ActivityActionTypes.CHANGE_ACTIVITIES_STATE, payload: newsState })
    }
}

export const deleteActivity = (id: string) => {
    return async (dispatch: Dispatch<ActivityAction>) => {
        try {
            return await $api.delete(`${process.env.REACT_APP_SERVER_URL}/api/section/${id}`)
        } catch (e) {
            dispatch({
                type: ActivityActionTypes.FETCH_ACTIVITIES_ERROR,
                payload: 'Произошла ошибка при удалении кружка'
            })
        }
    }
}