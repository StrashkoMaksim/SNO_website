import cn from 'classnames'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import styles from './AdminSliderCreator.module.scss'
import "./AdminSliderRestyle.scss"
import { FC, useEffect, useState } from 'react'
import { FormPages } from '../../../pages/Admin/AdminActivitiesPage/AdminAddActivitiesPage/AdminAddActivitiesPage'
import DefaultButton, { ButtonStyles, ButtonTypes } from '../../DefaultButton/DefaultButton'
import closeIcon from '../../../assets/img/close.svg'


interface ASSProps {
    handleNavigation: (currPage: FormPages) => void
    handleSubmit: (achievements: File[]) => void
    defaultAchievements?: {
        previewImg: string,
        img: string,
        _id: string
    }[]
}

const AdminSliderSelector: FC<ASSProps> = ({ handleNavigation, handleSubmit, defaultAchievements }) => {

    const [slidesPreview, setSlidesPreview] = useState<string[]>([]);
    const [images, setImages] = useState<File[]>([])

    const [sectionFilled, setSectionFilled] = useState<boolean>(false)

    useEffect(() => {

        if (defaultAchievements && defaultAchievements?.length !== 0 && !sectionFilled) {
            const previews: string[] = []
            const files: File[] = []

            defaultAchievements.forEach(achievement => {
                previews.push(`${process.env.REACT_APP_SERVER_URL}/${achievement.previewImg}`)
                fetch(`${process.env.REACT_APP_SERVER_URL}/${achievement.img}`)
                    .then(res => res.blob())
                    .then(blob => {
                        const file = new File([blob], achievement.img, blob)
                        files.push(file)
                    })
            })

            setSlidesPreview(previews)
            setImages(files)
            setSectionFilled(true)
        }

    }, [defaultAchievements])

    const sliderOptions = {
        arrows: false,
        dots: true,
        slidesToScroll: 1,
        variableWidth: true,
        threshold: 50,
        infinite: false
    }

    const handleSliderInput = (event: any) => {
        const img = event.target.files[0];

        if (img) {
            const imgURL = URL.createObjectURL(img)
            setSlidesPreview([imgURL, ...slidesPreview])
        }
        setImages([img, ...images])
    }

    const returnToPrevSection = () => {
        handleNavigation(FormPages.supAndSchedule)
    }

    const submit = () => {
        handleSubmit(images)
    }

    const deleteSlide = (slideIndex: number) => {
        return () => {
            const tempImgs = images;
            const tempPreviews = slidesPreview

            tempImgs.splice(slideIndex, 1)
            tempPreviews.splice(slideIndex, 1)

            setImages([...tempImgs])
            setSlidesPreview([...tempPreviews])
        }
    }


    return (
        <section className={cn('section')}>
            <div className={cn('container', styles.sliderBlock)}>
                <div className={styles.sliderInputContainer}>
                    <input
                        className={'visually-hidden'}
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
                        <div key={images[index]?.name} className={styles.slide}>
                            <img src={closeIcon} alt="" className={styles.closeSlideBtn} onClick={deleteSlide(index)} />
                            <img src={slide} alt="" />
                        </div>
                    )}
                </Slider>

                <div className={styles.controlButtons}>
                    <DefaultButton
                        text="Назад"
                        type={ButtonTypes.button}
                        style={ButtonStyles.adminFilled}
                        extraClass={'backButton'}
                        onClick={returnToPrevSection}
                    />
                    <DefaultButton
                        text="Сохранить"
                        type={ButtonTypes.button}
                        style={ButtonStyles.adminFilled}
                        onClick={submit}
                    />
                </div>
            </div>
        </section >
    )
}

export default AdminSliderSelector;
