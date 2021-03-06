import React, { FC, useEffect, useState } from 'react'
import styles from './SchedulePicker.module.scss'
import numerator from '../../../../../assets/img/numerator.svg'
import denominator from '../../../../../assets/img/denominator.svg'
import numeratorAnddenominator from '../../../../../assets/img/numerator&denominator.svg'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import cn from 'classnames'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import ruLocale from 'date-fns/locale/ru';
import { ScheduleInterface, WeekType } from '../../../../../types/schedule'
import Schedule from '../../../../../components/Schedule/Schedule'
import editIcon from "../../../../../assets/img/EditIcon.svg"
import trashIcon from "../../../../../assets/img/red_trash.svg"

const emptySchedule = {
    day: '',
    week: WeekType.numerator,
    time: '',
    classroom: ''
}

interface SchedulePickerProps {
    updateSchedule: (schedule: ScheduleInterface[]) => void
    defaultSchedule?: ScheduleInterface[]
}

const SchedulePicker: FC<SchedulePickerProps> = ({ updateSchedule, defaultSchedule }) => {
    const [schedule, setSchedule] = useState<ScheduleInterface[]>([])
    const [singleSchedule, setSingleSchedule] = useState<ScheduleInterface>(emptySchedule)

    const [weekType, setWeekType] = useState<WeekType>(WeekType.numerator)

    const [startTime, setStartTime] = useState<Date | null>(null)
    const [endTime, setEndTime] = useState<Date | null>(null)

    const [submitError, setSubmitError] = useState<string>('')

    const [editingBlockIndex, setEditingBlockIndex] = useState<number | null>(null)

    const [sectionFilled, setSectionFilled] = useState<boolean>(false)

    // ?????????????????? ???????????? (???????????? 1 ??????)

    useEffect(() => {
        if (!sectionFilled && defaultSchedule && defaultSchedule?.length !== 0) {
            setSchedule(defaultSchedule)
            setSectionFilled(true)
        }
    }, [defaultSchedule])

    useEffect(() => {
        updateSchedule(schedule)
    }, [schedule])


    // ?????????????? Date ?? ???????????? hh:mm
    const parseTime = (time: Date) => {
        const hours = ('0' + time.getHours()).slice(-2)
        const minutes = ('0' + time.getMinutes()).slice(-2)
        return hours + ':' + minutes;
    }


    const addDay = () => {

        if (!startTime || !endTime || !singleSchedule.classroom || !singleSchedule.day) {
            setSubmitError('????????????????????, ?????????????????? ?????? ????????!')
            return
        }
        else setSubmitError('')

        const time = parseTime(startTime) + '-' + parseTime(endTime)

        const newSchedule: ScheduleInterface = { ...singleSchedule, time: time, week: weekType }
        const updSchedule = schedule;

        // ???????? ?? ???????? ???????????? ???????? ???????????? ????????????????,
        // ?????????????? ???????????? ?????????????????????????? ??????????????????????????
        // ???? ?????????????????? ???????? ????????
        // ?????????? - ?????????????????? ??????????
        if (editingBlockIndex !== null) {

            updSchedule[editingBlockIndex] = newSchedule
            setEditingBlockIndex(null)
        }
        else updSchedule.push(newSchedule)


        // ???????????????????? ????????????
        setSingleSchedule(emptySchedule)
        setStartTime(null)
        setEndTime(null)

        // '...' ?????????? ?????????? ?????????????? ?????????? ????????????, ?? ???? ?????????????????? ???????????? ??????????
        // ?????????? ?????????????? ?? ???????????????????? Schedule ?????????????????? ???????????????????? ??????????
        setSchedule([...updSchedule])
    }

    // ?????????????????? ???????????? ???? ?????????????????????????? ?????? ???????????????????? ?? 
    // editor (?????????? ?????? ?????????????????? ??????)
    const moveScheduleToEditor = (arrayPosition: number) => {

        const dayToEdit = schedule[arrayPosition]
        const timeWindow = dayToEdit.time.split('-')
        const dayStartTime = Date.parse('2011-10-10T' + timeWindow[0] + ':00')
        const dayEndTime = Date.parse('2011-10-10T' + timeWindow[1] + ':00')

        setSingleSchedule(dayToEdit)
        setStartTime(new Date(dayStartTime))
        setEndTime(new Date(dayEndTime))
        setEditingBlockIndex(arrayPosition)
    }

    const deleteDay = (arrayPosition: number) => {
        return () => {
            const tmpSchedule = schedule;
            tmpSchedule.splice(arrayPosition, 1)
            setSchedule([...tmpSchedule])
        }
    }

    const handleSelectChange = (event: SelectChangeEvent) => {
        const inputValue = event.target.value;
        setSingleSchedule(prevState => ({ ...prevState, day: inputValue }));
    };

    const handleWeekTypeChange = (event: React.MouseEvent<HTMLElement>, newWeekType: WeekType | null) => {

        if (newWeekType != null) {
            setWeekType(newWeekType)
        };
    }

    const handleTimeChange = (time: Date | null, timeType: string) => {
        timeType === 'start' ? setStartTime(time) : setEndTime(time)
    }

    const handleClassroomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setSingleSchedule(prevState => ({ ...prevState, classroom: inputValue }));
    }

    return (
        <div className={styles.SchedulePicker}>

            <div className={styles.SchedulePicker__Picker}>
                <div className={styles.pickerElement}>

                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel id="dayOfTheWeekSelectorLabel">???????? ????????????</InputLabel>
                        <Select
                            labelId='dayOfTheWeekSelectorLabel'
                            label='???????? ????????????'
                            value={singleSchedule.day}
                            onChange={handleSelectChange}
                            required
                        >
                            <MenuItem value={'??????????????????????'}>??????????????????????</MenuItem>
                            <MenuItem value={'??????????????'}>??????????????</MenuItem>
                            <MenuItem value={'??????????'}>??????????</MenuItem>
                            <MenuItem value={'??????????????'}>??????????????</MenuItem>
                            <MenuItem value={'??????????????'}>??????????????</MenuItem>
                            <MenuItem value={'??????????????'}>??????????????</MenuItem>
                        </Select>
                    </FormControl>

                </div>
                <div className={styles.pickerElement}>
                    <label className={styles.toggleLabel}>?????? ????????????
                        <ToggleButtonGroup
                            value={weekType}
                            exclusive
                            onChange={handleWeekTypeChange}
                            aria-label="?????? ????????????"
                        >
                            <ToggleButton value={WeekType.numerator} title='??????????????????'>
                                <img src={numerator} alt="numerator" />
                            </ToggleButton>

                            <ToggleButton value={WeekType.denominator} title='??????????????????????'>
                                <img src={denominator} alt="denomitator" />
                            </ToggleButton>

                            <ToggleButton value={WeekType.every} title='???????????? ????????????'>
                                <img src={numeratorAnddenominator} alt="every week" />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </label>
                </div>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                    <div className={styles.pickerElement}>

                        <FormControl sx={{ maxWidth: 200 }}>
                            <TimePicker
                                label='???????????? ??????????????'
                                value={startTime}
                                onChange={(newValue) => handleTimeChange(newValue, 'start')}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </FormControl>

                        <FormControl sx={{ maxWidth: 200 }}>
                            <TimePicker
                                label='?????????????????? ??????????????'
                                value={endTime}
                                onChange={(newValue) => handleTimeChange(newValue, 'end')}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </FormControl>

                    </div>
                </LocalizationProvider>

                <div className={styles.pickerElement}>
                    <FormControl sx={{ maxWidth: 200 }}>
                        <TextField
                            label='??????????????????'
                            value={singleSchedule.classroom}
                            onChange={handleClassroomChange}
                            required
                        />
                    </FormControl>
                </div>

                <div className={styles["admin-add-form__field"]}>
                    <span className={styles["admin-add-form__error"]}>{submitError}</span>
                </div>

                <button
                    className={cn(styles.Button, styles['Button-Accept'])}
                    onClick={addDay}
                    type='button'
                >??????????????????</button>
            </div>

            <div className={styles.schedulePreview}>
                <Schedule schedule={schedule} />

                <div className={styles.schedulePreview__Control}>
                    {schedule.map((element, index) =>
                        <div
                            key={index}
                            className={styles.controlButtons}
                        >
                            <button type="button" className={styles.controlButton} onClick={() => moveScheduleToEditor(index)}>
                                <img src={editIcon} alt="" />
                            </button>
                            <button type="button" className={styles.controlButton} onClick={deleteDay(index)}>
                                <img src={trashIcon} alt="" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default SchedulePicker