import { FC, useEffect, useState } from 'react'
import DocumentsSection from "../../../components/DocumentsSection/DocumentsSection";
import http from "../../../assets/http-config";
import AdminSliderSelector from '../../../components/Admin/AdminSliderCreator/AdminSliderCreator';
import AdminSliderCreator from '../../../components/Admin/AdminSliderCreator/AdminSliderCreator';

const AdminPartnersPage: FC = () => {
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
                <h1 className="adminH1">Партнеры</h1>
            </header>

            <AdminSliderCreator handleNavigation={() => { }} handleSubmit={() => { }} />

        </>
    )
}

export default AdminPartnersPage