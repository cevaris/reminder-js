import util from 'util';
import { Reminder } from '../reminder';
const exec = util.promisify(require('child_process').exec);

/**
 * Send platform specific desktop alert with given params.
 */
export async function sendDesktop(reminder: Reminder): Promise<void> {
    let command = "";
    switch (process.platform) {
        case "darwin":
            command = `osascript -e 'display notification "${reminder.message}" with title "${reminder.name}"'`
        case "win32":
            command = `msg * ${reminder.message}`
    }

    try {
        await exec(command);
    } catch (e) {
        console.error(e);
    }
}