import nodemailer from 'nodemailer'; 
import { Config } from './config';
  
let mailTransporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
        user: Config.REMINDER_EMAIL, 
        pass: Config.REMINDER_EMAIL_PASSWORD,
    } 
}); 
  
let mailDetails = { 
    from: Config.REMINDER_EMAIL, 
    to: 'acardenas89+dev@gmail.com', 
    subject: 'Test mail', 
    text: 'Node.js testing mail for GeeksforGeeks'
}; 
  
mailTransporter.sendMail(mailDetails, function(err, data) { 
    if(err) { 
        console.log('Error Occurs'); 
    } else { 
        console.log('Email sent successfully'); 
    } 
}); 
