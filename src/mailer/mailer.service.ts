import { Injectable } from '@nestjs/common';
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "rominage.115@mail.com",
        pass: "nyjc ygog ngia geqa"
    },
})
const errorAlertTemplateHtml = `
    <p>An error happened with the following message : #message#</p>
    <p>Body : #body#</p>
    <p>Route : #url#</p>
`
@Injectable()
export class MailerService {

    sendErrorAlert(err, body, url) {
        return transporter.sendMail({
            from: '',
            to: '',
            subject: 'An exception happened in FundRiseHub API !',
            html: errorAlertTemplateHtml.replace(/#message#/, err).replace(/#body#/, JSON.stringify(body)).replace(/#url#/, url)
        })
    }
}
