import { Injectable } from '@nestjs/common';
import { env } from 'env';
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "rominage.115",
        pass: env.APP_PASS
    },
})
const errorAlertTemplateHtml = `
    <p>An error happened with the following message : #message#</p>
    <p>Body : #body#</p>
    <p>Route : #url#</p>
`
const resetPasswordTemplateHtml = `
    <div style="background-color: #f2f2f2; padding: 20px;">
        <div style="background-color: #ffffff; border-radius: 10px; padding: 20px; text-align: center;">
            <h1 style="font-size: 24px; margin-bottom: 30px;">Réinitialisation du mot de passe</h1>
            <p style="font-size: 16px; text-align: left; margin-bottom: 30px;">Bonjour #username#,</p>
            <p style="font-size: 16px; text-align: left; margin-bottom: 30px;">Vous avez récemment demandé la réinitialisation du mot de passe de votre compte FundRiseHub. Cliquez sur le bouton ci-dessous pour continuer.</p>
            <div style="text-align: center; margin-bottom: 10;">
                <a href="#BASE_URL#reset-password/#tokenResetPassword#" style="background-color: #007bff; border-radius: 5px; color: #ffffff; font-size: 16px; text-decoration: none; padding: 10px 20px; display: inline-block;" target="_blank">Réinitialiser le mot de passe</a>
            </div>
            <p style="font-size: 16px; text-align: center; margin-bottom: 20px; color: red;">*Votre demande expirera dans 15 minutes, ne partagez pas ce lien avec quelqu'un d'autre !</p>
        </div>
        <p style="font-size: 16px; text-align: left; margin-bottom: 30px; color: red; font-weight: bold;">*Attention: Si vous n'avez pas demandé de réinitialisation de mot de passe, veuillez ignorer cet e-mail ou répondre pour nous en informer.</p>
    </div>
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
    async sendResetPasswordEmail(username, tokenResetPassword, to) {
        try {
            const html = resetPasswordTemplateHtml.replace(/#username#/g, username).replace(/#tokenResetPassword#/g, tokenResetPassword).replace(/#BASE_URL#/g, env.BASE_URL)
            const params = {
                from: 'noreply@fundrisehubpro.com',
                to,
                subject: '[Fund Rise Hub] - Réinitialisation de mot de passe',
                html,
            }
            await transporter.sendMail(params)
        } catch (err) {
            console.log(err)
        }
    }
}
