import cn from 'classnames';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './AdminSliderCreator.module.scss'
import "./AdminSliderRestyle.scss"
import { FC, useState } from 'react';
import { FormPages } from '../../../pages/Admin/AdminActivitiesPage/AdminAddActivitiesPage/AdminAddActivitiesPage';
import DefaultButton, { ButtonStyles, ButtonTypes } from '../../DefaultButton/DefaultButton';

export interface Achievements {
    achievements: File[]
}

// ахахахах
interface ASSProps {
    handleNavigation: (currPage: FormPages) => void
    handleSectionSubmit: (nextSectionName: FormPages, m?: undefined, s?: undefined, data?: Achievements) => any
    handleSubmit: () => void
}

const AdminSliderSelector: FC<ASSProps> = ({ handleNavigation, handleSectionSubmit, handleSubmit }) => {

    const [slidesPreview, setSlidesPreview] = useState<string[]>([]);
    const [images, setImages] = useState<File[]>([])

    const sliderOptions = {
        arrows: false,
        dots: true,
        slidesToScroll: 1,
        variableWidth: true,
        threshold: 50
    }

    const handleSliderInput = (event: any) => {
        const img = event.target.files[0];

        if (img) {
            const imgURL = URL.createObjectURL(img)
            setSlidesPreview([imgURL, ...slidesPreview])
        }
        setImages([img, ...images])
    }

    const handleAchievementsSubmit = async () => {
        await handleSectionSubmit(FormPages.main, undefined, undefined, { achievements: images })
            .then(() => handleSubmit())
    }

    const returnToPrevSection = () => {
        handleNavigation(FormPages.supAndSchedule)
    }


    return (
        <section className={cn('section')}>
            <div className={cn('container', styles.sliderBlock)}>
                <div className={styles.sliderInputContainer}>
                    <input
                        className={styles['visually-hidden']}
                        type="file"
                        accept=".jpg"
                        id={styles.sliderInput}
                        name={styles.sliderInput}
                        onChange={handleSliderInput} />

                    <label htmlFor={styles.sliderInput} >
                        <div className={styles.inputLabel}>Добавить изображение</div>
                    </label>
                </div>

                <Slider {...sliderOptions} className={styles.slider}>
                    {slidesPreview.map((slide, index) =>
                        <a href="#" target="_blank" key={images[index].name} className={styles.slide}>
                            <img src={slide} alt="" />
                        </a>
                    )}
                </Slider>

                <div className={styles.controlButtons}>
                    <DefaultButton
                        text="Назад"
                        type={ButtonTypes.button}
                        style={ButtonStyles.adminFilled}
                        extraClass={styles.backButton}
                        onClick={returnToPrevSection}
                    />
                    <DefaultButton
                        text="Далее"
                        type={ButtonTypes.button}
                        style={ButtonStyles.adminFilled}
                        onClick={handleAchievementsSubmit}
                    />
                </div>
            </div>
        </section >
    )
}

export default AdminSliderSelector;
