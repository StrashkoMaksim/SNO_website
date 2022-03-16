export type Partner = {
    _id: string
    img: string
    link: string
}

export interface PartnerState {
    partners: Partner[];
    loading: boolean;
    error: null | string;
}

export enum PartnerActionTypes {
    FETCH_PARTNERS = 'FETCH_PARTNERS',
    FETCH_PARTNERS_ERROR = 'FETCH_PARTNERS_ERROR',
    FETCH_PARTNERS_SUCCESS = 'FETCH_PARTNERS_SUCCESS'
}

interface FetchPartnersAction {
    type: PartnerActionTypes.FETCH_PARTNERS
}

interface FetchPartnersSuccessAction {
    type: PartnerActionTypes.FETCH_PARTNERS_SUCCESS
    payload: Partner[]
}

interface FetchPartnersErrorAction {
    type: PartnerActionTypes.FETCH_PARTNERS_ERROR
    payload: string
}

export type PartnerAction = FetchPartnersAction | FetchPartnersSuccessAction | FetchPartnersErrorAction