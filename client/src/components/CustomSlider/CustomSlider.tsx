
import cn from 'classnames';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './CustomSlider.module.scss'
import "./CustomSliderRestyle.scss"
import { FC } from "react"

interface Slide {
    _id: string,
    previewImg: string,
    img?: string
    link?: string
}

interface CustomSliderProps {
    slides: Slide[],
    title: string
}

const CustomSlider: FC<CustomSliderProps> = ({ slides, title }) => {

    const sliderOptions = {
        arrows: false,
        dots: true,
        slidesToScroll: 1,
        variableWidth: true,
        threshold: 50
    }

    return (
        <section className={cn('section', styles.sliderBlock)}>
            <div className={cn('container')}>
                <h1>{title}</h1>
                <Slider {...sliderOptions} className={styles.slider}>
                    {slides.map(slide =>
                        <a key={slide._id} href={slide?.link} target="_blank" className={styles.slide}>
                            <img src={`${process.env.REACT_APP_SERVER_URL}/${slide.previewImg}`} alt="" />
                        </a>
                    )}
                </Slider>
            </div>
        </section >
    )
}

export default CustomSlider;