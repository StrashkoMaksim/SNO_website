import { ScheduleInterface } from "./schedule";
import { emptySupervisor, Supervisor } from "./supervisor";

export interface Activity {
    name: string,
    previewText: string,
    logo: string | Blob | File,
    supervisor: Supervisor,
    supervisorPhoto: string | Blob | File,

    content: any[],
    schedule: ScheduleInterface[],
    achievements: File[]
}

export const emptyActivity = {
    name: '',
    previewText: '',
    logo: '',
    supervisor: emptySupervisor,
    supervisorPhoto: '',
    content: [],
    schedule: [],
    achievements: []
}

export interface ActivityState {
    activities: Activity[]
    loading: boolean
    error: null | string
}

export enum ActivityActionTypes {
    FETCH_ACTIVITIES = 'FETCH_ACTIVITIES',
    FETCH_ACTIVITIES_ERROR = 'FETCH_ACTIVITIES_ERROR',
    FETCH_ACTIVITIES_SUCCESS = 'FETCH_ACTIVITIES_SUCCESS',
    CHANGE_ACTIVITIES_STATE = 'CHANGE_ACTIVITIES_STATE',
}

interface FetchActivityPreviewsAction {
    type: ActivityActionTypes.FETCH_ACTIVITIES
}

interface FetchActivityPreviewsSuccessAction {
    type: ActivityActionTypes.FETCH_ACTIVITIES_SUCCESS
    payload: Activity[]
}

interface FetchActivityPreviewsErrorAction {
    type: ActivityActionTypes.FETCH_ACTIVITIES_ERROR
    payload: string
}

interface ChangeActivityStateAction {
    type: ActivityActionTypes.CHANGE_ACTIVITIES_STATE
    payload: ActivityState
}

export type ActivityAction = FetchActivityPreviewsAction | FetchActivityPreviewsSuccessAction | FetchActivityPreviewsErrorAction |
    ChangeActivityStateAction

