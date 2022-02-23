export interface AdminPageState {
    page: string
}

export enum AdminPageActionTypes {
    CHANGE_PAGE = 'CHANGE_PAGE',
}

interface ChangePageAction {
    type: AdminPageActionTypes.CHANGE_PAGE
    payload: string
}

export type AdminPageAction = ChangePageAction