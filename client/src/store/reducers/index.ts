import { combineReducers } from "redux";
import { newsReducer } from "./newsReducer";
import { supervisorReducer } from "./supervisorReducer";
import { userReducer } from "./userReducer";
import { tagReducer } from "./tagReducer";
import { activitiesReducer } from "./activitiesReducer";

export const rootReducer = combineReducers({
    news: newsReducer,
    supervisor: supervisorReducer,
    user: userReducer,
    tag: tagReducer,
    activity: activitiesReducer
})

export type RootState = ReturnType<typeof rootReducer>