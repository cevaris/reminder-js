/**
 * Defines which reminder alert types there are.
 */
export enum ReminderType {
    Email = 'email',
    Desktop = 'desktop',
}

/**
 * Defines the shape of a Reminder object.
 */
export interface Reminder {
    name: string
    schedule: string
    message: string
    types: Set<ReminderType>
}
