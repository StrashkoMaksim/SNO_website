export interface SupervisorState {
    supervisors: any[]
    loading: boolean
    error: null | string
}

export enum SupervisorActionTypes {
    FETCH_SUPERVISOR = "FETCH_SUPERVISOR",
    FETCH_SUPERVISOR_SUCCESS = "FETCH_SUPERVISOR_SUCCESS",
    FETCH_SUPERVISOR_ERROR = "FETCH_SUPERVISOR_ERROR"
}

interface FetchSupervisorAction {
    type: SupervisorActionTypes.FETCH_SUPERVISOR
}

interface FetchSupervisorSuccessAction {
    type: SupervisorActionTypes.FETCH_SUPERVISOR_SUCCESS
    payload: any[]
}

interface FetchSupervisorErrorAction {
    type: SupervisorActionTypes.FETCH_SUPERVISOR_ERROR
    payload: string
}

export type SupervisorAction = FetchSupervisorAction | FetchSupervisorSuccessAction | FetchSupervisorErrorAction