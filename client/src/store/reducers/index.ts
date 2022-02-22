import {combineReducers} from "redux";
import {newsReducer} from "./newsReducer";
import {supervisorReducer} from "./supervisorReducer";
import {userReducer} from "./userReducer";

export const rootReducer = combineReducers({
    news: newsReducer,
    supervisor: supervisorReducer,
    user: userReducer
})

export type RootState = ReturnType<typeof rootReducer>