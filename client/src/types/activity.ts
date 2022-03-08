import e from "express";
import { ScheduleInterface } from "./schedule";
import { emptySupervisor, Supervisor } from "./supervisor";

export interface Activity {
    name: string,
    previewText: string,
    logo: string | Blob | File,
    supervisor: Supervisor
    supervisorPhoto: string | Blob | File,
    content: FormData | null,
    schedule: ScheduleInterface[]
}

export const emptyActivity = {
    name: '',
    previewText: '',
    logo: '',
    supervisor: emptySupervisor,
    supervisorPhoto: '',
    content: null,
    schedule: []
}