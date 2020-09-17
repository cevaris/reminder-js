import util from 'util';
import { Reminder } from '../reminder';
const exec = util.promisify(require('child_process').exec);

export async function sendDesktop(reminder: Reminder): Promise<void> {
    // osascript -e 'display notification "Lorem ipsum dolor sit amet" with title "Title"'

    const command = `osascript -e 'display notification "${reminder.message}" with title "${reminder.name}"'`
    try {
        await exec(command);
    } catch (e) {
        console.error(e);
    }
}