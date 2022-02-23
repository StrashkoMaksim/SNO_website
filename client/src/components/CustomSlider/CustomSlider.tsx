import image1 from "../../assets/img/mockslider/1.png"
import image2 from "../../assets/img/mockslider/2.png"
import image3 from "../../assets/img/mockslider/3.png"
import image4 from "../../assets/img/mockslider/4.png"
import image5 from "../../assets/img/mockslider/5.png"
import cn from 'classnames';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './CustomSlider.module.scss'

const CustomSlider = () => {
    // Тут надо фетчить с бэка наверное
    const partners = [
        {
            name: '1',
            imgSrc: image1
        },
        {
            name: '2',
            imgSrc: image2
        },
        {
            name: '3',
            imgSrc: image3
        },
        {
            name: '4',
            imgSrc: image5
        },
        {
            name: '5',
            imgSrc: image4
        },
        {
            name: '6',
            imgSrc: image3
        },
        {
            name: '7',
            imgSrc: image2
        },
        {
            name: '8',
            imgSrc: image4
        },
        {
            name: '9',
            imgSrc: image1
        }
    ]

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
                <Slider {...sliderOptions} className={styles.slider}>
                    {partners.map(partner =>
                        <a href="#" target="_blank" className={styles.slide}>
                            <img src={partner.imgSrc} alt=""/>
                        </a>
                    )}
                </Slider>
            </div>
        </section >
    )
}

export default CustomSlider;