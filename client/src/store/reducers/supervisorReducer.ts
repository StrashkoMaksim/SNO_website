import {SupervisorAction, SupervisorActionTypes, SupervisorState} from "../../types/supervisor";

const initialState: SupervisorState = {
    supervisors: [],
    loading: false,
    error: null
}

export const supervisorReducer = (state = initialState, action: SupervisorAction): SupervisorState => {
    switch (action.type) {
        case SupervisorActionTypes.FETCH_SUPERVISOR:
            return { ...state, supervisors: [], loading: true }
        case SupervisorActionTypes.FETCH_SUPERVISOR_SUCCESS:
            return { ...state, loading: false, supervisors: action.payload }
        case SupervisorActionTypes.FETCH_SUPERVISOR_ERROR:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}