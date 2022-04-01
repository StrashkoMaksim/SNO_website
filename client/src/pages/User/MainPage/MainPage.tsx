import React, { useEffect, useState } from "react"
import NewsBlock from "../../../components/News/NewsBlock/NewsBlock"
import ActivitiesBlock from "../../../components/Activities/ActivitiesBlock/ActivitiesBlock"
import Slider from "../../../components/CustomSlider/CustomSlider"
import http from "../../../assets/http-config";

interface Partner {
    img: string,
    link: string,
    _id: string
}

const MainPage = () => {

    const [partners, setPartners] = useState<Partner[]>([])

    useEffect(() => {
        const fetchPartners = async () => {
            const response = await http.get(`/partners`)
            return response;
        }

        fetchPartners()
            .then(response => {
                if (response.status === 200) {
                    setPartners(response.data)
                }
            })

    }, [])


    return (
        <>
            <NewsBlock count={4} page={1} />
            <ActivitiesBlock isAdmin={false} />
            <Slider slides={partners.map(partner => { return { previewImg: partner.img, link: partner.link, _id: partner._id } })} title='Партнеры' />
        </>
    )
}

export default MainPage