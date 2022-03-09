import {Dispatch} from "redux";
import axios from "axios";
import {Supervisor, SupervisorAction, SupervisorActionTypes} from "../../types/supervisor";

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

export const addSupervisor = (supervisor: Supervisor) => {
    return async (dispatch: Dispatch<SupervisorAction>) => {
        try {
            const formData = new FormData()
            formData.set('lastName', supervisor.lastName)
            formData.set('firstAndMiddleName', supervisor.firstAndMiddleName)
            formData.set('department', supervisor.department)
            formData.set('position', supervisor.position)
            formData.set('phone', supervisor.phone)
            formData.set('photo', supervisor.photo)

            dispatch({ type: SupervisorActionTypes.FETCH_SUPERVISOR })
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/supervisor`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch({ type: SupervisorActionTypes.FETCH_SUPERVISOR_SUCCESS, payload: response.data.supervisors })

            return response
        } catch (e) {
            dispatch({
                type: SupervisorActionTypes.FETCH_SUPERVISOR_ERROR,
                payload: 'Произошла ошибка при загрузке руководителей'
            })
        }
    }
}