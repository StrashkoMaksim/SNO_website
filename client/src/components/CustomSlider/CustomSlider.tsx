
import image1 from "../../assets/img/mockslider/1.png"
import image2 from "../../assets/img/mockslider/2.png"
import image3 from "../../assets/img/mockslider/3.png"
import image4 from "../../assets/img/mockslider/4.png"
import image5 from "../../assets/img/mockslider/5.png"
import cn from 'classnames';
import styles from './CustomSlider.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Scrollbar, Navigation, Pagination } from 'swiper';

import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/scrollbar'
import 'swiper/scss/pagination'

SwiperCore.use([Scrollbar, Navigation, Pagination])

const CustomSlider = () => {
    console.log(document.querySelector(`.${styles.bullets}`))
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
            imgSrc: image4
        },
        {
            name: '5',
            imgSrc: image5
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

    return (
        <section className={cn('section', styles.sliderBlock)}>
            <div className={cn('container')}>
                <Swiper
                    spaceBetween={50}
                    slidesPerView={4}
                    pagination={{ clickable: true, dynamicBullets: true }} //el: `.${styles.bullets}` - блок куда должны встать точки не находится из за ебучего css-модуля
                >
                    {partners.map(partner =>
                        <SwiperSlide key={partner.name}><div className={styles.imgContainer}><img src={partner.imgSrc} /></div></SwiperSlide>
                    )}
                    <div className={styles.bullets}></div>

                </Swiper>
            </div>
        </section >
    )
}

export default CustomSlider;