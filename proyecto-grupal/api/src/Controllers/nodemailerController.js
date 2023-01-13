const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
        user: 'gonzalovalloneivan',
        pass: 'wehxuhuqswrtcauj'
    },
    tls:{rejectUnauthorized:false}
});

const deliverMail = async (email, subject, text, html) =>{
    try{
        let mailDetails = {
            from: 'gonzalovalloneivan@gmail.com.ar',
            to: `${email}`,
            subject: `${subject}`,
            text: `${text}`,
            html: `${html}`
        };
        await mailTransporter.sendMail(mailDetails);
        return true
    }catch(error){
        return false
    }
}
module.exports = { deliverMail }

