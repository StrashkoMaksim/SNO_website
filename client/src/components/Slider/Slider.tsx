
import image1 from "../../assets/img/mockslider/1.png"
import image2 from "../../assets/img/mockslider/2.png"
import image3 from "../../assets/img/mockslider/3.png"
import image4 from "../../assets/img/mockslider/4.png"
import image5 from "../../assets/img/mockslider/5.png"
import cn from 'classnames';
import './Slider.module.scss'

// Пока не работает

const Slider = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
    };

    return (
        <section className={cn('section')} style={{ 'marginBottom': '200px' }}>
            <div className={cn('container')}>
            </div>
        </section >
    )
}

export default Slider;