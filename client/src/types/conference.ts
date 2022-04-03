import { IDocument } from "./document"

export interface IConference {
    _id: string,
    image: File | string,
    description: string,
    documents: IDocument[]
}

export const emptyConference = {
    _id: '',
    image: '',
    description: '',
    documents: []
}