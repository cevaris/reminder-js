/**
 * Extract expected ENV variables into JS variables for use
 * within the JS application.
 */
class AppConfig {
    REMINDER_EMAIL: string
    REMINDER_EMAIL_PASSWORD: string

    constructor() {
        this.REMINDER_EMAIL = this.required('REMINDER_EMAIL');
        this.REMINDER_EMAIL_PASSWORD = this.required('REMINDER_EMAIL_PASSWORD');
    }

    private required(name: string): string {
        const value = process.env[name];
        if (value) {
            return value;
        } else {
            throw Error(`Missing ENV variable ${name}`)
        }
    }
}

export const Config = new AppConfig();