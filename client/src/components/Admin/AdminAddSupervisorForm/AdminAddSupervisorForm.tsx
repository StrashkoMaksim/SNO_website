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
    sectionSubmitted: boolean,
    updateSupervisor: (supervisor: Supervisor) => void
}

const AdminAddSupervisorForm: FC<AASFProps> = ({ sectionSubmitted, updateSupervisor }) => {


    const [supervisor, setSupervisor] = useState<Supervisor>(emptySupervisor)

    useEffect(() => {
        updateSupervisor(supervisor)
    }, [sectionSubmitted])

    const handleAvatarChange = (event: any) => {
        const img = event.target.files[0];
        setSupervisor(prevState => ({ ...prevState, photo: img }))
    }

    const onChangeTextInputsHandle = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const inputName = e.currentTarget.name;
        const inputValue = e.currentTarget.value;
        setSupervisor(prevState => ({ ...prevState, [inputName]: inputValue }))
    }

    return (
        <div className={styles.Supervisor}>

            <InfoLabel text='Руководитель' />

            <AdminFormInputImg
                name='avatar'
                onChange={handleAvatarChange}
                defaultImg={placeHolderImg}
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
                        extraClass={cn(styles.Bold, styles.lastName)}
                    />
                    <AdminFormInputText
                        style={AFITStyle.input}
                        placeholder='Имя Отчество'
                        name='firstAndMiddleName'
                        onChange={onChangeTextInputsHandle}
                        value={supervisor.firstAndMiddleName}
                        extraClass={cn(styles.Regular, styles.midAndFirstName)}
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
                        extraClass={styles.Light}
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
                        extraClass={styles.Light}
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
                        extraClass={styles.Light}
                    />
                </div>
            </div>
        </div>
    )
}

export default AdminAddSupervisorForm