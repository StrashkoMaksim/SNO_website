
export enum WeekType {
    numerator = 'numerator',
    denominator = 'denominator',
    every = 'numerator/denominator'
}

export const emptySchedule = {
    day: '',
    week: WeekType.denominator,
    time: '',
    classroom: ''
}

export interface ScheduleInterface {
    day: string,
    week: WeekType,
    time: string,
    classroom: string
}