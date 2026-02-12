export interface Medicines {
    id: number;
    name: string;
    time: Date;
    dose: string
    day: WeekDays;
}

export enum WeekDays {
    Monday = 'Monday',
    Tuesday = 'Tuesday',
    Wednesday = 'Wednesday',
    Thursday = 'Thursday',
    Friday = 'Friday',
    Saturday = 'Saturday',
    Sunday = 'Sunday'
}