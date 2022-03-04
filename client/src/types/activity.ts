import { ScheduleIntefrace } from "./schedule";

export interface Activity {
    name: string,
    previewText: string,
    logo: string | Blob | File,
    supervisor: {
        fio: string,
        department: string,
        position: string,
        phone: string
    }
    supervisorPhoto: string | Blob | File,
    content: string,
    schedule: ScheduleIntefrace[]
}

export const emptyActivity = {
    name: '',
    previewText: '',
    logo: '',
    supervisor: {
        fio: '',
        department: '',
        position: '',
        phone: ''
    },
    supervisorPhoto: '',
    content: '',
    schedule: []
}