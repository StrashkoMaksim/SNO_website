import React from "react"
import NewsBlock from "../../components/News/NewsBlock/NewsBlock"
import ActivitiesBlock from "../../components/Activities/ActivitiesBlock"
import Slider from "../../components/CustomSlider/CustomSlider"

const MainPage = () => {
    return (
        <>
            <NewsBlock count={4} page={1} />
            <ActivitiesBlock />
            <Slider />
        </>
    )
}

export default MainPage