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

export const fetchCouncil = () => {
    return async (dispatch: Dispatch<SupervisorAction>) => {
        try {
            dispatch({ type: SupervisorActionTypes.FETCH_SUPERVISOR })
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/council`)
            dispatch({ type: SupervisorActionTypes.FETCH_SUPERVISOR_SUCCESS, payload: response.data })
        } catch (e) {
            dispatch({
                type: SupervisorActionTypes.FETCH_SUPERVISOR_ERROR,
                payload: 'Произошла ошибка при загрузке членов совета'
            })
        }
    }
}

export const addSupervisor = (supervisor: Supervisor) => {
    return async (dispatch: Dispatch<SupervisorAction>) => {
        try {
            const formData = getFormData(supervisor)

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

export const addCouncilMember = (supervisor: Supervisor) => {
    return async (dispatch: Dispatch<SupervisorAction>) => {
        try {
            const formData = getFormData(supervisor)

            dispatch({ type: SupervisorActionTypes.FETCH_SUPERVISOR })
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/council`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch({ type: SupervisorActionTypes.FETCH_SUPERVISOR_SUCCESS, payload: response.data.council })

            return response
        } catch (e) {
            dispatch({
                type: SupervisorActionTypes.FETCH_SUPERVISOR_ERROR,
                payload: 'Произошла ошибка при загрузке членов совета'
            })
        }
    }
}

export const updateSupervisor = (supervisor: Supervisor) => {
    return async (dispatch: Dispatch<SupervisorAction>) => {
        try {
            const formData = getFormData(supervisor)

            dispatch({ type: SupervisorActionTypes.FETCH_SUPERVISOR })
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/supervisor/${supervisor._id}`, formData, {
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

export const updateCouncilMember = (supervisor: Supervisor) => {
    return async (dispatch: Dispatch<SupervisorAction>) => {
        try {
            const formData = getFormData(supervisor)

            dispatch({ type: SupervisorActionTypes.FETCH_SUPERVISOR })
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/council/${supervisor._id}`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch({ type: SupervisorActionTypes.FETCH_SUPERVISOR_SUCCESS, payload: response.data.council })

            return response
        } catch (e) {
            dispatch({
                type: SupervisorActionTypes.FETCH_SUPERVISOR_ERROR,
                payload: 'Произошла ошибка при загрузке членов совета'
            })
        }
    }
}

export const deleteSupervisor = (supervisorId: string) => {
    return async (dispatch: Dispatch<SupervisorAction>) => {
        try {
            dispatch({ type: SupervisorActionTypes.FETCH_SUPERVISOR })
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/supervisor/${supervisorId}`, {
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

export const deleteCouncilMember = (supervisorId: string) => {
    return async (dispatch: Dispatch<SupervisorAction>) => {
        try {
            dispatch({ type: SupervisorActionTypes.FETCH_SUPERVISOR })
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/council/${supervisorId}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch({ type: SupervisorActionTypes.FETCH_SUPERVISOR_SUCCESS, payload: response.data.council })

            return response
        } catch (e) {
            dispatch({
                type: SupervisorActionTypes.FETCH_SUPERVISOR_ERROR,
                payload: 'Произошла ошибка при загрузке членов совета'
            })
        }
    }
}

function getFormData (supervisor: Supervisor) {
    const formData = new FormData()

    formData.set('lastName', supervisor.lastName)
    formData.set('firstAndMiddleName', supervisor.firstAndMiddleName)
    formData.set('department', supervisor.department)
    formData.set('position', supervisor.position)
    formData.set('phone', supervisor.phone)

    if (typeof supervisor.photo !== 'string') {
        formData.set('photo', supervisor.photo)
    }

    return formData
}