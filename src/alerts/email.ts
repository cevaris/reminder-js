import nodemailer from 'nodemailer';
import { Config } from '../config';
import { Reminder } from '../reminder';

// Configure nodemailer email
const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: Config.REMINDER_EMAIL,
        pass: Config.REMINDER_EMAIL_PASSWORD,
    }
});

/**
 * Sends email to yourself
 */
export function sendEmail(reminder: Reminder): Promise<void> {
    const mailDetails = {
        from: Config.REMINDER_EMAIL,
        to: Config.REMINDER_EMAIL,
        subject: reminder.name,
        text: reminder.message
    };

    return mailTransporter.sendMail(mailDetails);
}
