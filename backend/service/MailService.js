const nodemailer = require('nodemailer')
const ApiError = require("../exceptions/ApiError")

/**
 * Service for sending emails (verification codes, notifications)
 */
class MailService {
    constructor() {
        // Initialize SMTP transporter for sending emails
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

    /**
     * Send verification code email to user
     * @param {string} email - Recipient email address
     * @param {string} code - Verification code to send
     * @returns {Promise<void>}
     */
    async sendMail(email, code) {
        try {
            await this.transporter.sendMail({
                from: `"Shopigo" <${process.env.SMTP_USER}>`,
                to: email,
                subject: 'Your Shopigo verification code',
                html: `
                    <!doctype html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <style>
                        body {
                            margin: 0;
                            padding: 0;
                            background-color: #ffffff;
                            font-family: Arial, sans-serif;
                        }

                        .wrapper {
                            width: 100%;
                            table-layout: fixed;
                            background-color: #d8d8d8;
                            padding: 40px 0;
                        }

                        .main-card {
                            background-color: #ffffff;
                            margin: 0 auto;
                            width: 600px;
                            border-spacing: 0;
                            border-radius: 12px;
                            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.07);
                            overflow: hidden;
                        }

                        .header {
                            background-color: #005a5a;
                            padding: 35px;
                            text-align: center;
                        }
                        .logo-text {
                            color: #ffffff;
                            margin: 0;
                            font-size: 28px;
                            font-weight: bold;
                            letter-spacing: 1px;
                        }

                        .content {
                            padding: 40px;
                            text-align: center;
                            color: #333333;
                        }
                        .title {
                            font-size: 22px;
                            font-weight: bold;
                            margin-bottom: 15px;
                        }
                        .text {
                            font-size: 16px;
                            line-height: 1.5;
                            color: #666666;
                        }

                        .code-display {
                            background-color: #f0f9f8;
                            border: 1px solid #d1e5e3;
                            border-radius: 8px;
                            padding: 20px;
                            margin: 30px auto;
                            width: fit-content;
                        }
                        .code-number {
                            font-size: 38px;
                            font-weight: bold;
                            color: #008080;
                            letter-spacing: 6px;
                            margin: 0;
                        }

                        .btn-wrapper {
                            margin: 20px 0;
                        }
                        .btn {
                            display: inline-block;
                            background-color: #004d4d;
                            color: #ffffff !important;
                            padding: 15px 40px;
                            text-decoration: none;
                            border-radius: 6px;
                            font-weight: bold;
                            font-size: 16px;
                            transition: all 0.2s ease-in-out;
                        }

                        .btn:hover {
                            background-color: #00caba !important;
                            transform: scale(1.06);
                            box-shadow: 0 4px 12px rgba(0, 202, 186, 0.3);
                        }

                        .footer {
                            padding: 25px;
                            text-align: center;
                            font-size: 12px;
                            color: #999999;
                        }
                        </style>
                    </head>
                    <body>
                        <div class="wrapper">
                        <table class="main-card" align="center">
                            <tr>
                            <td class="header">
                                <div class="logo-text">SHOPIGO</div>
                            </td>
                            </tr>
                            <tr>
                            <td class="content">
                                <div class="title">Verification Code</div>
                                <p class="text">
                                Please use the code below to complete your sign-in process. This
                                code will expire in 10 minutes.
                                </p>

                                <div class="code-display">
                                <div class="code-number">${code}</div>
                                </div>

                                <div class="btn-wrapper">
                                <a href="http://localhost:3000" class="btn">Continue to Shop</a>
                                </div>
                            </td>
                            </tr>
                            <tr>
                            <td class="footer">
                                &copy; 2026 Shopigo Marketplace. All rights reserved.<br />
                                If you didn't request this email, please ignore it.
                            </td>
                            </tr>
                        </table>
                        </div>
                    </body>
                    </html>
                `,
            })
        } catch (e) {
            throw ApiError.Internal('Failed to send email')
        }
    }
}

module.exports = new MailService()