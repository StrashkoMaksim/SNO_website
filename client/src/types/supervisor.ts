export interface SupervisorState {
    supervisors: Supervisor[]
    loading: boolean
    error: null | string
}

export enum SupervisorActionTypes {
    FETCH_SUPERVISOR = "FETCH_SUPERVISOR",
    FETCH_SUPERVISOR_SUCCESS = "FETCH_SUPERVISOR_SUCCESS",
    FETCH_SUPERVISOR_ERROR = "FETCH_SUPERVISOR_ERROR"
}

export interface Supervisor {
    _id: string
    photo: string | Blob
    lastName: string
    firstAndMiddleName: string
    department: string,
    position: string,
    phone: string
}

export type AddSupervisor = Omit<Supervisor, "_id">

export const emptySupervisor = {
    _id: '0',
    photo: '',
    lastName: '',
    firstAndMiddleName: '',
    department: '',
    position: '',
    phone: ''
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