import React from "react"
import NewsBlock from "../../../components/News/NewsBlock/NewsBlock"
import ActivitiesBlock from "../../../components/Activities/ActivitiesBlock/ActivitiesBlock"
import Slider from "../../../components/CustomSlider/CustomSlider"
import image1 from "../../../assets/img/mockslider/1.png"
import image2 from "../../../assets/img/mockslider/2.png"
import image3 from "../../../assets/img/mockslider/3.png"
import image4 from "../../../assets/img/mockslider/4.jpg"
import image5 from "../../../assets/img/mockslider/5.png"

const MainPage = () => {


    const partners = [
        {
            _id: '1',
            previewImg: image1
        },
        {
            _id: '2',
            previewImg: image2
        },
        {
            _id: '3',
            previewImg: image3
        },
        {
            _id: '4',
            previewImg: image5
        },
        {
            _id: '5',
            previewImg: image4
        },
        {
            _id: '6',
            previewImg: image3
        },
        {
            _id: '7',
            previewImg: image2
        },
        {
            _id: '8',
            previewImg: image4
        },
        {
            _id: '9',
            previewImg: image1
        }
    ]

    return (
        <>
            <NewsBlock count={4} page={1} />
            <ActivitiesBlock isAdmin={false}/>
            <Slider slides={partners} title='Партнеры' />
        </>
    )
}

export default MainPage