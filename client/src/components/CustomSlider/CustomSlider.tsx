
import cn from 'classnames';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './CustomSlider.module.scss'
import "./CustomSliderRestyle.scss"
import { FC, useState } from "react"
import MakeModal from '../MakeModal/MakeModal';

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

    const [modalOpened, setModalOpened] = useState<boolean>(false)
    const [fullImg, setFullImg] = useState<string>('')

    const toggleModal = () => setModalOpened(!modalOpened)

    const sliderOptions = {
        arrows: false,
        dots: true,
        slidesToScroll: 1,
        variableWidth: true,
        threshold: 50
    }

    const openFullImg = (img: string | undefined) => {
        return (e: any) => {
            if (img) {
                setFullImg(`${process.env.REACT_APP_SERVER_URL}/${img}`)
                toggleModal()
            }
        }
    }

    return (
        <section className={cn('section', styles.sliderBlock)}>
            <div className={cn('container')}>

                <MakeModal
                    modalOpened={modalOpened}
                    closeModal={toggleModal}
                    hasBackground={false}
                >
                    <img src={fullImg} alt="" />
                </MakeModal>

                <h1>{title}</h1>
                <Slider {...sliderOptions} className={styles.slider}>
                    {slides.map(slide =>
                        <a key={slide._id} href={slide?.link} target="_blank" className={styles.slide}>
                            <img src={`${process.env.REACT_APP_SERVER_URL}/${slide.previewImg}`} alt=""
                                onClick={openFullImg(slide.img)}
                            />
                        </a>
                    )}
                </Slider>
            </div>
        </section >
    )
}

export default CustomSlider;