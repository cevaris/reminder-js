require('dotenv').config();

import yaml from 'js-yaml';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { Reminder, ReminderType } from './reminder';
import { sendDesktop } from './alerts/desktop';
import { sendEmail } from './alerts/email';

interface ReminderYaml {
    name: string
    datetime: string
    message: string
    types: string
}

async function loop(reminders: Array<Reminder>): Promise<void> {
    reminders.forEach(async r => {
        r.types.forEach(async t => {
            if (t == ReminderType.Desktop) {
                await sendDesktop(r);
            }

            if (t == ReminderType.Email) {
                await sendEmail(r);
            }
        });
    });

    // pause for some period, then call again
    await new Promise((r) => setTimeout(r, 1000));
    await loop([]);
}

const configPath = os.homedir() + path.sep + '.reminder.yaml';

if (!fs.existsSync(configPath)) {
    console.error(`no ${configPath} config found, no alerts configured.`);
    process.exit(0);
}

const reminders = new Array<Reminder>();
const reminderConfig = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
if (reminderConfig instanceof Array) {
    reminderConfig.forEach((obj: ReminderYaml) => {
        const datetime = new Date(Date.parse(obj.datetime));
        console.log(obj.types.split(',').map(t => t as ReminderType));
        const types = obj.types.split(',').map(t => t as ReminderType);
        reminders.push({
            name: obj.name,
            message: obj.message,
            datetime: datetime,
            types: new Set(types)
        });
    })
}

// kick off task
loop(reminders).catch(e => console.error(e))
