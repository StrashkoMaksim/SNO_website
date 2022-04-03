import { FC, useEffect, useState } from 'react'
import http from "../../../assets/http-config";
import cn from 'classnames'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import styles from './AdminPartnersPage.module.scss'
import "./AdminSliderRestyle.scss"
import closeIcon from '../../../assets/img/close.svg'
import DefaultButton, { ButtonStyles, ButtonTypes } from '../../../components/DefaultButton/DefaultButton';
import AddPartnerModal from './AddPartnerModal/AddPartnerModal';


interface Partner {
    img: File,
    link: string,
    _id: string
}

const AdminPartnersPage: FC = () => {

    const [slidesPreview, setSlidesPreview] = useState<string[]>([]);
    const [partners, setPartners] = useState<Partner[]>([])
    const [partnersUpdated, setPartnersUpdated] = useState<boolean>(false)
    const [modalOpened, setModalOpened] = useState<boolean>(false)

    const closeModal = () => setModalOpened(false)
    const openModal = () => setModalOpened(true)

    const sliderOptions = {
        arrows: false,
        dots: true,
        slidesToScroll: 1,
        variableWidth: true,
        threshold: 50,
        infinite: false
    }

    useEffect(() => {
        const fetchPartners = async () => {
            const response = await http.get(`/partners`)
            return response;
        }

        fetchPartners()
            .then(response => {
                if (response.status === 200) {
                    setPartners(response.data)
                }
            })

    }, [partnersUpdated])

    useEffect(() => {
        const previews: string[] = partners.map(partner => `${process.env.REACT_APP_SERVER_URL}/${partner.img}`)
        setSlidesPreview(previews)
    }, [partners])

    const addPartner = async (partner: Partner) => {
        const formData = new FormData()
        if (partner.img) formData.set('img', partner.img)
        formData.set('link', partner.link)

        await http.post('/partners', formData, {
            headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                if (response.status === 201) setPartnersUpdated(!partnersUpdated)
            })
            .catch(err => {
                alert(err.response.data.message)
            })
    }

    const deletePartner = (slideIndex: number, partnerId: string) => {
        return async () => {
            await http.delete(`/partners/${partnerId}`, {
                headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
            })
                .then(response => {
                    if (response.status === 200) setPartnersUpdated(!partnersUpdated)

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }


    return (
        <>
            <header className="adminHeader">
                <h1 className="adminH1">Партнеры</h1>
            </header>

            <AddPartnerModal modalOpened={modalOpened} closeModal={closeModal} onSubmit={addPartner} />

            <div className={styles.addPartnerBlock}>

                <DefaultButton
                    text='Добавить партнера'
                    type={ButtonTypes.button}
                    style={ButtonStyles.adminFilled}
                    onClick={openModal}
                />

                <Slider {...sliderOptions} className={styles.slider}>
                    {slidesPreview.map((slide, index) =>
                        <div key={partners[index]?._id} className={styles.slide}>
                            <img src={closeIcon} alt="" className={styles.closeSlideBtn} onClick={deletePartner(index, partners[index]?._id)} />
                            <img src={slide} alt="" />
                        </div>
                    )}
                </Slider>

            </div>

        </>
    )
}

export default AdminPartnersPage;

