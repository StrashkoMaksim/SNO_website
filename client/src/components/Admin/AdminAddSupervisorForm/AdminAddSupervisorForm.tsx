import styles from './AdminAddSupervisorForm.module.scss'
import cn from 'classnames'
import AdminFormInputImg from '../AdminFormInputImg/AdminFormInputImg'
import placeHolderImg from '../../../assets/img/roundPlaceholderImg.png'
import locationIcon from "../../../assets/img/locationIcon.svg"
import phoneIcon from "../../../assets/img/phoneIcon.svg"
import positionIcon from "../../../assets/img/positionIcon.svg"
import InfoLabel from '../../InfoLabel/InfoLabel'
import AdminFormInputText, { AFITStyle } from '../AdminFormInputText/AdminFormInputText'
import { FC, FormEvent, useEffect, useState } from 'react'
import { emptySupervisor, Supervisor } from '../../../types/supervisor'

interface AASFProps {
    updateSupervisor: (supervisor: Supervisor) => void
    currentSupervisor?: Supervisor
}

const AdminAddSupervisorForm: FC<AASFProps> = ({ updateSupervisor, currentSupervisor }) => {
    const [supervisor, setSupervisor] = useState<Supervisor>(currentSupervisor || emptySupervisor)
    const [sectionFilled, setSectionFilled] = useState<boolean>(false)

    useEffect(() => {
        if (currentSupervisor && !sectionFilled && currentSupervisor.lastName !== '') {
            setSupervisor(currentSupervisor)
            setSectionFilled(true)
        }
    }, [currentSupervisor])

    useEffect(() => {
        updateSupervisor(supervisor)
    }, [supervisor])

    const handleAvatarChange = (event: any) => {
        const img = event.target.files[0];

        if (img) {
            setSupervisor(prevState => ({ ...prevState, photo: img }))
        }
    }

    const onChangeTextInputsHandle = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const inputName = e.currentTarget.name;
        const inputValue = e.currentTarget.value;
        setSupervisor(prevState => ({ ...prevState, [inputName]: inputValue }))
    }

    const defaultImg = supervisor.photo instanceof Blob ? URL.createObjectURL(supervisor.photo) : supervisor.photo

    return (
        <div className={styles.Supervisor}>

            <InfoLabel text='Руководитель' />

            <AdminFormInputImg
                name='avatar'
                onChange={handleAvatarChange}
                defaultImg={defaultImg}
                extraClass={styles.Avatar}
                id='supervisorImgInput'
            />

            <div className={styles.Data}>
                <div className={styles.FIO}>
                    <AdminFormInputText
                        style={AFITStyle.input}
                        placeholder='Фамилия'
                        name='lastName'
                        onChange={onChangeTextInputsHandle}
                        value={supervisor.lastName}
                        extraClass={cn('Bold', styles.lastName)}
                    />
                    <AdminFormInputText
                        style={AFITStyle.input}
                        placeholder='Имя Отчество'
                        name='firstAndMiddleName'
                        onChange={onChangeTextInputsHandle}
                        value={supervisor.firstAndMiddleName}
                        extraClass={cn('Regular', styles.midAndFirstName)}
                    />
                </div>

                <div className={styles.Data__Block}>
                    <img src={locationIcon} alt="" />
                    <AdminFormInputText
                        style={AFITStyle.input}
                        placeholder='Кафедра'
                        name='department'
                        onChange={onChangeTextInputsHandle}
                        value={supervisor.department}
                        extraClass='Light'
                    />
                </div>
                <div className={styles.Data__Block}>
                    <img src={positionIcon} alt="" />
                    <AdminFormInputText
                        style={AFITStyle.input}
                        placeholder='Должность'
                        name='position'
                        onChange={onChangeTextInputsHandle}
                        value={supervisor.position}
                        extraClass='Light'
                    />
                </div>
                <div className={styles.Data__Block}>
                    <img src={phoneIcon} alt="" />
                    <AdminFormInputText
                        style={AFITStyle.input}
                        placeholder='Телефон'
                        name='phone'
                        onChange={onChangeTextInputsHandle}
                        value={supervisor.phone}
                        extraClass='Light'
                    />
                </div>
            </div>
        </div>
    )
}

export default AdminAddSupervisorForm