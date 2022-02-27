import React, { ChangeEventHandler, FC } from "react";
import MakeModal from "../../components/MakeModal/MakeModal";
import styles from "./AddEventModal.module.scss"
import DateAdapter from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ruLocale from 'date-fns/locale/ru';
import TextField from '@mui/material/TextField';
import cn from "classnames";
import http from "../../assets/http-config";
import { response } from "express";
import { error } from "console";


export enum RequestType {
    post = 'post',
    put = 'put'
}

interface AddEventModalProps {
    requestType: RequestType
    modalOpened: boolean
    closeModal: Function
    name?: string
    date?: string
    organizerText?: string
    organizerLink?: string
}

const AddEventModal: FC<AddEventModalProps> = ({ ...props }) => {


    const [date, setDate] = React.useState<Date | null>(null);
    const [formData, setFormData] = React.useState({});

    const inputRecolor = {
        width: '100%',
        "& label.Mui-focused": {
            color: '#69ab52'
        },
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: '#69ab52'
            }
        }
    }

    const onChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({ ...formData, [name]: value })
    }


    const onDateChange = (date: Date | null) => {
        setFormData({ ...formData, 'date': date })
        setDate(date)
    }

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const { target } = event;

        try {
            await http.post('/event', formData, {
                headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
            })
                .then(response => { console.log(response) })
        }
        catch (e) {
            console.log(e)
        }

        // response.data.message - успешно
    }

    const postEvent = () => {

    }

    const putEvent = () => {

    }


    return (
        <MakeModal modalOpened={props.modalOpened} closeModal={props.closeModal}>
            <section className={cn('section', styles.FormContainer)}>
                <form className={styles.AddEvent} onSubmit={handleFormSubmit}>
                    <h2>{(props.requestType === 'post' ? "Добавить" : "Изменить") + " мероприятие"}</h2>
                    <label htmlFor="name">
                        <TextField
                            variant="outlined"
                            name="name"
                            label="Название"
                            sx={inputRecolor}
                            onChange={onChangeEvent}
                            required ></TextField>
                    </label>

                    <LocalizationProvider dateAdapter={DateAdapter} locale={ruLocale}>
                        <DatePicker
                            label="Дата"
                            value={date}
                            cancelText="Отмена"

                            onChange={(newValue) => {
                                onDateChange(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} sx={inputRecolor} required />}
                        />
                    </LocalizationProvider>

                    <label htmlFor="name">
                        <TextField
                            variant="outlined"
                            label="Организатор"
                            name="organizerText"
                            sx={inputRecolor}
                            onChange={onChangeEvent}
                            required
                        ></TextField>
                    </label>

                    <label htmlFor="name">
                        <TextField
                            variant="outlined"
                            label="Ссылка на организатора"
                            name="organizerLink"
                            sx={inputRecolor}
                            onChange={onChangeEvent}
                            required
                        ></TextField>
                    </label>

                    <div className={styles.Buttons}>
                        <button className={cn(styles.Button, styles['Button-Accept'])}>Принять</button>
                        <button type="reset" className={cn(styles.Button, styles['Button-Deny'])}>Отмена</button>
                    </div>

                    <button
                        className={cn(styles.DeleteButton,
                            { [styles['DeleteButton-active']]: props.requestType === RequestType.put })}
                    > удалить</button>
                </form>
            </section>
        </MakeModal >
    )
}

export default AddEventModal;