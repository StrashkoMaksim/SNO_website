import React, { ChangeEventHandler, FC, useEffect } from "react";
import MakeModal from "../../components/MakeModal/MakeModal";
import styles from "./AddEventModal.module.scss"
import DateAdapter from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ruLocale from 'date-fns/locale/ru';
import TextField from '@mui/material/TextField';
import cn from "classnames";
import http from "../../assets/http-config";
import checkMark from "../../assets/img/checkMark.svg"
import errorMark from "../../assets/img/errorIcon.svg"


export enum RequestType {
    post = 'post',
    put = 'put'
}

export interface eventData {
    id: string
    name: string | null,
    date: Date | null,
    organizerText: string,
    organizerLink: string,
}

interface AddEventModalProps {
    requestType: RequestType
    modalOpened: boolean
    closeModal: Function
    eventData: eventData
    updateEvents: Function
}

const AddEventModal: FC<AddEventModalProps> = ({ ...props }) => {

    const [date, setDate] = React.useState<Date | null>(null);
    const [name, setName] = React.useState<string | null>(null)
    const [organizerText, setOrganizerText] = React.useState<string | null>(null)
    const [organizerLink, setOrganizerLink] = React.useState<string | null>(null)

    const [formData, setFormData] = React.useState<eventData>(props.eventData);
    const [requestSuccessful, setRequestSuccessful] = React.useState<boolean | null>(null);
    const [reqErrMessage, setReqErrMsg] = React.useState<string>("");
    const [reqSuccessMessage, setReqSuccessMsg] = React.useState<string>("");

    useEffect(() => {
        setName(props.eventData.name)
        setDate(props.eventData.date)
        setOrganizerText(props.eventData.organizerText)
        setOrganizerLink(props.eventData.organizerLink)
        setFormData(props.eventData)
    }, [props.eventData])

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

        switch (name) {
            case 'name': {
                setName(value)
                break;
            }
            case 'organizerText': {
                setOrganizerText(value)
                break;
            }
            case 'organizerLink': {
                setOrganizerLink(value)
                break;
            }
        }
    }

    const onDateChange = (date: Date | null) => {
        setFormData({ ...formData, 'date': date })
        setDate(date)
    }

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const { target } = event;
        try {
            props.requestType === RequestType.post ? postEvent() : putEvent()
        }
        catch (err) {
            console.log(err)
        }
    }

    const postEvent = async () => {
        await http.post('/event', formData, {
            headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => handleResponse(response.status, 'добавлено'))
            .catch(err => {
                handleResponse(err.message.match("\\d+")[0])
            })
    }

    const putEvent = async () => {

        console.log(formData.date)
        console.log(formData.date instanceof Date)

        await http.put(`/event/${props.eventData.id}`, formData, {
            headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => handleResponse(response.status, 'изменено'))
            .catch(err => {
                handleResponse(err.message.match("\\d+")[0])
            })
    }

    const deleteEvent = async () => {
        await http.delete(`/event/${props.eventData.id}`, {
            headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => handleResponse(response.status, 'удалено'))
            .catch(err => {
                handleResponse(err.message.match("\\d+")[0])
            })
    }


    const handleResponse = (status: string | number, successMsg?: string) => {
        switch (status) {
            case 201: {
                setRequestSuccessful(true);
                if (successMsg) setReqSuccessMsg(successMsg)
                props.updateEvents()
                break;
            }
            case '400': {
                setRequestSuccessful(false);
                setReqErrMsg("Ссылка введена в неверном формате");
                break;
            }
            case '401': {
                setRequestSuccessful(false)
                setReqErrMsg("Время вашего логина истекло")
                break;
            }
            default: {
                setRequestSuccessful(false)
                setReqErrMsg("Непредвиденная ошибка")
            }
        }

        setTimeout(() => {
            setRequestSuccessful(null)
        }, 3000)

    }

    return (
        <MakeModal modalOpened={props.modalOpened} closeModal={props.closeModal}>
            <form className={styles.AddEvent} onSubmit={handleFormSubmit}>
                <div className={cn(styles.checkMark, { [styles['checkMark-active']]: requestSuccessful })}>
                    <img src={checkMark} alt="check mark icon" />
                    <span>{`Мероприятие успешно ${reqSuccessMessage}!`}</span>
                </div>
                <div className={cn(styles.checkMark, styles['checkMark-error'], { [styles['checkMark-active']]: (!requestSuccessful && requestSuccessful != null) })}>
                    <img src={errorMark} alt="check mark icon" />
                    <span>{reqErrMessage}</span>
                </div>
                <h2>{(props.requestType === 'post' ? "Добавить" : "Изменить") + " мероприятие"}</h2>
                <label htmlFor="name">
                    <TextField
                        variant="outlined"
                        name="name"
                        label="Название"
                        value={name}
                        sx={inputRecolor}
                        onChange={onChangeEvent}
                        required ></TextField>
                </label>

                <LocalizationProvider dateAdapter={DateAdapter} locale={ruLocale} >
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

                <label htmlFor="organizerText">
                    <TextField
                        variant="outlined"
                        label="Организатор"
                        name="organizerText"
                        value={organizerText}
                        sx={inputRecolor}
                        onChange={onChangeEvent}
                        required
                    ></TextField>
                </label>

                <label htmlFor="organizerLink">
                    <TextField
                        variant="outlined"
                        label="Ссылка на организатора"
                        name="organizerLink"
                        value={organizerLink}
                        sx={inputRecolor}
                        onChange={onChangeEvent}
                        required
                    ></TextField>
                </label>

                <div className={styles.Buttons}>
                    <button className={cn(styles.Button, styles['Button-Accept'])}>Принять</button>
                    <button type="button" onClick={() => props.closeModal()} className={cn(styles.Button, styles['Button-Deny'])}>Отмена</button>
                </div>

                <button type='button'
                    onClick={deleteEvent}
                    className={cn(styles.DeleteButton,
                        { [styles['DeleteButton-active']]: props.requestType === RequestType.put })}
                > удалить</button>
            </form>
        </MakeModal >
    )
}

export default AddEventModal;