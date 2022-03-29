import { FC, useEffect, useState } from 'react'
import DocumentsSection from "../../../components/DocumentsSection/DocumentsSection";
import styles from "./AdminGrantsPage.module.scss"
import http from "../../../assets/http-config";

const AdminGrantsPage: FC = () => {
    const [documents, setDocuments] = useState<any[]>([]);
    const [documentsUpdated, setDocumentsUpdated] = useState<boolean>(false)

    useEffect(() => {
        const fetchDocuments = async () => {
            const response = await http.get(`/grants-document`)
            return response;
        }

        fetchDocuments()
            .then(response => {
                if (response.status === 200) {
                    setDocuments(response.data)
                }
            })
    }, [documentsUpdated])

    const triggerDataFetch = () => setDocumentsUpdated(!documentsUpdated)

    const deleteDocument = async (id: string) => {
        await http.delete(`/grants-document/${id}`,
            {
                headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            .then(response => {
                // @ts-ignore
                if (response && response.status !== 200 && response.status !== 201) {
                    // @ts-ignore
                    console.log(response)
                    // @ts-ignore
                    alert(response.data.message)
                }
                triggerDataFetch();
            })
    }

    const addDocument = async (document: any) => {
        const fd = new FormData();
        fd.set('name', document.name)
        fd.set('link', document.link)
        fd.set('file', document.file)

        await http.post('/grants-document', fd,
            {
                headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            .then(response => {
                // @ts-ignore
                if (response && response.status !== 200 && response.status !== 201) {
                    // @ts-ignore
                    console.log(response)
                    // @ts-ignore
                    alert(response.data.message)
                }
                triggerDataFetch();
            })

    }

    return (
        <>
            <header className="adminHeader">
                <h1 className="adminH1">Документы на повышенную стипендию</h1>
            </header>

            <DocumentsSection
                title={'Документы'}
                documents={documents}
                updateData={triggerDataFetch}
                deleteDocument={deleteDocument}
                addDocument={addDocument}
                isAdmin
            />

        </>
    )
}

export default AdminGrantsPage