import { DocumentsAction, DocumentsActionTypes, DocumentsState } from "../../types/document";

const initialState: DocumentsState = {
    documents: [],
    loading: false,
    error: null
}

export const documentsReducer = (state = initialState, action: DocumentsAction): DocumentsState => {
    switch (action.type) {
        case DocumentsActionTypes.FETCH_DOCUMENTS:
            return { loading: true, error: null, documents: [] }
        case DocumentsActionTypes.FETCH_DOCUMENTS_SUCCESS:
            return { loading: false, error: null, documents: action.payload }
        case DocumentsActionTypes.FETCH_DOCUMENTS_ERROR:
            return { loading: false, error: action.payload, documents: [] }
        case DocumentsActionTypes.CHANGE_DOCUMENTS_STATE:
            return { loading: action.payload.loading, error: action.payload.error, documents: action.payload.documents }
        default:
            return state
    }
}