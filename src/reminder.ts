export enum ReminderType {
    Email = 'email',
    Desktop = 'desktop',
}

export interface Reminder {
    name: string
    schedule: string
    message: string
    types: Set<ReminderType>
}
