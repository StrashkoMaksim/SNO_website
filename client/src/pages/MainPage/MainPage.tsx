import React, { FunctionComponent } from "react"
import NewsBlock from "../../components/News/NewsBlock/NewsBlock"
import ActivitiesBlock from "../../components/Activities/ActivitiesBlock"
import MainLayout from "../../components/MainLayout/MainLayout"
import Slider from "../../components/CustomSlider/CustomSlider"

const MainPage = () => {
    return (
        <MainLayout>
            <NewsBlock count={4} page={1} />
            <ActivitiesBlock />
            <Slider />
        </MainLayout >
    )
}

export default MainPage