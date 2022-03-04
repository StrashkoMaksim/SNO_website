
export enum WeekType {
    numerator = 'numerator',
    denominator = 'denominator',
    every = 'numerator/denominator'
}

export interface ScheduleIntefrace {
    day: string,
    week: WeekType,
    time: string,
    classroom: string
}