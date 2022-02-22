import {UserAction, UserActionTypes, UserState} from "../../types/user";

const initialState: UserState = {
    isAuth: false,
    error: null
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.LOGIN_USER:
            return { isAuth: true, error: null }
        case UserActionTypes.LOGIN_USER_ERROR:
            return { isAuth: false, error: action.payload }
        case UserActionTypes.LOGOUT_USER:
            return { isAuth: false, error: null}
        default:
            return state
    }
}