import { ActivityAction, ActivityActionTypes, ActivityState } from "../../types/activity";
import { Dispatch } from "redux";
import axios from "axios";

export const fetchActivityPreviews = (/*page = 1, count: Number*/) => {
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

export const fetchActivityAdmin = (id: string) => {
    return async (dispatch: Dispatch<ActivityAction>) => {
        try {
            dispatch({ type: ActivityActionTypes.FETCH_ACTIVITIES })
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/section/admin/${id}`,
                {
                    headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
                })
            dispatch({ type: ActivityActionTypes.FETCH_ACTIVITIES_SUCCESS, payload: [response.data] })
        } catch (e) {
            dispatch({
                type: ActivityActionTypes.FETCH_ACTIVITIES_ERROR,
                payload: 'Произошла ошибка при загрузке кружка'
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
            return await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/section/${id}`,
                {
                    headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
                })
        } catch (e) {
            dispatch({
                type: ActivityActionTypes.FETCH_ACTIVITIES_ERROR,
                payload: 'Произошла ошибка при удалении кружка'
            })
        }
    }
}