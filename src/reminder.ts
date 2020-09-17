export enum ReminderType {
    Email = 'email',
    Desktop = 'desktop',
}

export interface Reminder {
    name: string
    datetime: Date
    message: string
    types: Set<ReminderType>
}
