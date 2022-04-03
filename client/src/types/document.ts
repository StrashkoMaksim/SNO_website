export interface IDocument {
    _id: string,
    type: string,
    name: string,
    link: string,
    file?: File
}

export interface DocumentCategory {
    _id: string,
    title: string,
    documents: IDocument[]
}

export const EmptyDocumentCategory = {
    _id: '',
    title: '',
    documents: []
}

export interface DocumentsState {
    documents: DocumentCategory[]
    loading: boolean
    error: null | string
}

export enum DocumentsActionTypes {
    FETCH_DOCUMENTS = 'FETCH_DOCUMENTS',
    FETCH_DOCUMENTS_ERROR = 'FETCH_DOCUMENTS_ERROR',
    FETCH_DOCUMENTS_SUCCESS = 'FETCH_DOCUMENTS_SUCCESS',
    CHANGE_DOCUMENTS_STATE = 'CHANGE_DOCUMENTS_STATE',
}

interface FetchDocumentsPreviewsAction {
    type: DocumentsActionTypes.FETCH_DOCUMENTS
}

interface FetchDocumentsPreviewsSuccessAction {
    type: DocumentsActionTypes.FETCH_DOCUMENTS_SUCCESS
    payload: DocumentCategory[]
}

interface FetchDocumentsPreviewsErrorAction {
    type: DocumentsActionTypes.FETCH_DOCUMENTS_ERROR
    payload: string
}

interface ChangeDocumentsStateAction {
    type: DocumentsActionTypes.CHANGE_DOCUMENTS_STATE
    payload: DocumentsState
}

export type DocumentsAction = FetchDocumentsPreviewsAction | FetchDocumentsPreviewsSuccessAction | FetchDocumentsPreviewsErrorAction |
    ChangeDocumentsStateAction

