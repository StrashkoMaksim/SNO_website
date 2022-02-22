import React, { FunctionComponent } from "react"
import NewsBlock from "../../components/News/NewsBlock"
import ActivitiesBlock from "../../components/Activities/ActivitiesBlock"
import MainLayout from "../../components/MainLayout/MainLayout"
import Slider from "../../components/Slider/Slider"

const MainPage = () => {
    return (
        <MainLayout>
            <NewsBlock />
            <ActivitiesBlock />
        </MainLayout>
    )
}

export default MainPage