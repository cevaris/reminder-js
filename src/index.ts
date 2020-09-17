require('dotenv').config();

import { CronJob } from 'cron';
import fs from 'fs';
import yaml from 'js-yaml';
import os from 'os';
import path from 'path';
import { sendDesktop } from './alerts/desktop';
import { sendEmail } from './alerts/email';
import { ReminderType } from './reminder';

interface ReminderYaml {
    name: string
    schedule: string
    message: string
    types: string
}

const configPath = os.homedir() + path.sep + '.reminder.yaml';

if (!fs.existsSync(configPath)) {
    console.error(`no ${configPath} config found, no alerts configured.`);
    process.exit(0);
}

const reminderConfig = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
if (reminderConfig instanceof Array) {
    reminderConfig.forEach((obj: ReminderYaml) => {
        const types = obj.types.split(',').map(t => t as ReminderType);
        const reminder = {
            name: obj.name,
            message: obj.message,
            schedule: obj.schedule,
            types: new Set(types)
        }

        var job = new CronJob(obj.schedule, function () {
            reminder.types.forEach(async t => {
                if (t == ReminderType.Desktop) {
                    await sendDesktop(reminder);
                }

                if (t == ReminderType.Email) {
                    await sendEmail(reminder);
                }
            });
        }, null, false, 'UTC');
        job.start();
    })
}