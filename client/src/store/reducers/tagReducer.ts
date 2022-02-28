import {TagAction, TagActionTypes, TagState} from "../../types/tag";

const initialState: TagState = {
    tags: [],
    loading: false,
    error: null
}

export const tagReducer = (state = initialState, action: TagAction) : TagState => {
    switch (action.type) {
        case TagActionTypes.FETCH_TAGS:
            return { loading: true, error: null, tags: []}
        case TagActionTypes.FETCH_TAGS_SUCCESS:
            return { loading: false, error: null, tags: action.payload}
        case TagActionTypes.FETCH_TAGS_ERROR:
            return { loading: false, error: action.payload, tags: []}
        default:
            return state
    }
}