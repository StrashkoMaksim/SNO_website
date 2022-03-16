import {PartnerAction, PartnerActionTypes, PartnerState} from "../../types/partner"

const initialState: PartnerState = {
    partners: [],
    loading: false,
    error: null
}

export const partnerReducer = (state = initialState, action: PartnerAction) : PartnerState => {
    switch (action.type) {
        case PartnerActionTypes.FETCH_PARTNERS:
            return { loading: true, error: null, partners: []}
        case PartnerActionTypes.FETCH_PARTNERS_SUCCESS:
            return { loading: false, error: null, partners: action.payload}
        case PartnerActionTypes.FETCH_PARTNERS_ERROR:
            return { loading: false, error: action.payload, partners: []}
        default:
            return state
    }
}