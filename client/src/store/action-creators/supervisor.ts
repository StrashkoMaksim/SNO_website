import {Dispatch} from "redux";
import axios from "axios";
import {SupervisorAction, SupervisorActionTypes} from "../../types/supervisor";

export const fetchSupervisors = () => {
    return async (dispatch: Dispatch<SupervisorAction>) => {
        try {
            dispatch({ type: SupervisorActionTypes.FETCH_SUPERVISOR })
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/supervisor`)
            dispatch({ type: SupervisorActionTypes.FETCH_SUPERVISOR_SUCCESS, payload: response.data })
        } catch (e) {
            dispatch({
                type: SupervisorActionTypes.FETCH_SUPERVISOR_ERROR,
                payload: 'Произошла ошибка при загрузке руководителей'
            })
        }
    }
}