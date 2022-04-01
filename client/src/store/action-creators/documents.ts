import { DocumentsAction, DocumentsActionTypes, DocumentsState } from "../../types/document";
import { Dispatch } from "redux"
import axios, { AxiosError, AxiosResponse } from "axios"
import $api from "../../hooks/useProtectedAxios"

export const fetchDocumentCategories = () => {
    return async (dispatch: Dispatch<DocumentsAction>) => {
        try {
            dispatch({ type: DocumentsActionTypes.FETCH_DOCUMENTS })
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/document-category/with-documents`)
            dispatch({ type: DocumentsActionTypes.FETCH_DOCUMENTS_SUCCESS, payload: response.data })
        } catch (e) {
            dispatch({
                type: DocumentsActionTypes.FETCH_DOCUMENTS_ERROR,
                payload: 'Произошла ошибка при загрузке секций документов'
            })
        }
    }
}

export const addDocumentCategory = (title: string) => {
    return async (dispatch: Dispatch<DocumentsAction>) => {
        try {
            return await $api.post('/document-category', { title: title })
        } catch (e) {
            const error = e as AxiosError
            if (axios.isAxiosError(error)) {
                dispatch({
                    type: DocumentsActionTypes.FETCH_DOCUMENTS_ERROR,
                    payload: error.response?.data.message
                })
            }
        }
    }
}

export const updateDocumentCategory = (categoryId: string, title: string) => {
    return async (dispatch: Dispatch<DocumentsAction>) => {
        try {
            console.log(`renaming to ${title}`)
            return await $api.put(`/document-category/${categoryId}`, { title: title })
        } catch (e) {
            const error = e as AxiosError
            if (axios.isAxiosError(error)) {
                dispatch({
                    type: DocumentsActionTypes.FETCH_DOCUMENTS_ERROR,
                    payload: error.response?.data.message
                })
            }
            return error.response
        }
    }
}

export const deleteDocumentFromDocumentCategory = (id: string, documentNumber: number) => {
    return async (dispatch: Dispatch<DocumentsAction>) => {
        try {
            return await $api.delete(`/document-category/${id}/${documentNumber}`)
        } catch (e) {
            const error = e as AxiosError
            if (axios.isAxiosError(error)) {
                dispatch({
                    type: DocumentsActionTypes.FETCH_DOCUMENTS_ERROR,
                    payload: error.response?.data.message
                })
            }
            return error.response
        }
    }
}

export const addDocumentToDocumentCategory = (categoryId: string, formData: FormData) => {
    return async (dispatch: Dispatch<DocumentsAction>) => {
        try {
            return await $api.post<{ message: string }>(`/document-category/${categoryId}`, formData)
        } catch (e) {
            const error = e as AxiosError
            if (axios.isAxiosError(error)) {
                dispatch({
                    type: DocumentsActionTypes.FETCH_DOCUMENTS_ERROR,
                    payload: error.response?.data.message
                })
            }
            return error.response
        }
    }
}

export const deleteDocumentCategory = (id: string) => {
    return async (dispatch: Dispatch<DocumentsAction>) => {
        try {
            return await $api.delete(`/document-category/${id}`)
        } catch (e) {
            const error = e as AxiosError
            if (axios.isAxiosError(error)) {
                dispatch({
                    type: DocumentsActionTypes.FETCH_DOCUMENTS_ERROR,
                    payload: error.response?.data.message
                })
            }
            return error.response
        }
    }
}

export const changeDocumentsState = (documentsState: DocumentsState) => {
    return async (dispatch: Dispatch<DocumentsAction>) => {
        dispatch({ type: DocumentsActionTypes.CHANGE_DOCUMENTS_STATE, payload: documentsState })
    }
}
