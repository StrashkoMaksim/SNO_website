import {ActivityAction, ActivityActionTypes, ActivityState} from "../../types/activity";

const initialState: ActivityState = {
    activities: [],
    loading: false,
    error: null
}

export const activitiesReducer = (state = initialState, action: ActivityAction) : ActivityState => {
    switch (action.type) {
        case ActivityActionTypes.FETCH_ACTIVITIES:
            return { loading: true, error: null, activities: []}
        case ActivityActionTypes.FETCH_ACTIVITIES_SUCCESS:
            return { loading: false, error: null, activities: action.payload}
        case ActivityActionTypes.FETCH_ACTIVITIES_ERROR:
            return { loading: false, error: action.payload, activities: []}
        case ActivityActionTypes.CHANGE_ACTIVITIES_STATE:
            return { loading: action.payload.loading, error: action.payload.error, activities: action.payload.activities}
        default:
            return state
    }
}