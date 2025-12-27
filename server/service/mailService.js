const nodemailer = require('nodemailer')
const ApiError = require("../exceptions/ApiError")

class MailService {
    constructor () {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        })
    }

    async sendMail(email, code) {
        try{
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to: email,
                subject: `Activation for`,
                text: `This is code for activation ${code}`,
            })
        } catch (e) {
            throw ApiError.Internal(e)
        }
    }
}

module.exports = new MailService()