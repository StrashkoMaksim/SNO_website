import {AdminPageAction, AdminPageActionTypes, AdminPageState} from "../../types/adminPage";

const initialState: AdminPageState = {
    page: 'news'
}

export const adminPageReducer = (state = initialState, action: AdminPageAction): AdminPageState => {
    switch (action.type) {
        case AdminPageActionTypes.CHANGE_PAGE:
            return { page: action.payload }
        default:
            return state
    }
}