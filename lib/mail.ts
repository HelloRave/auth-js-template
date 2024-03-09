import nodemailer from 'nodemailer';

export class Email {
    private from: string;

    constructor(
        private to: string, private url?: string
    ) {
        this.from = `Placeholder`;
    }

    newTransport() {
        return nodemailer.createTransport({
            host: `${process.env.MAILTRAP_HOST}`,
            port: Number(process.env.MAILTRAP_PORT),
            auth: {
                user: `${process.env.MAILTRAP_USERNAME}`,
                pass: `${process.env.MAILTRAP_PASSWORD}`,
            }
        });
    }

    async send(subject: string, html: string) {
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
        }
    
        await this.newTransport().sendMail(mailOptions);
    }

    async sendVerfication() {
        await this.send(
            'Confirm your email',
            `<p>Confirm your email <a href="${this.url}">here</a>`,
        )
    }

    async sendPasswordReset() {
        await this.send(
            'Request to reset password',
            `<p>Please update your password <a href="${this.url}">here</a>`,
        )
    }

    async accountDeactivated() {
        await this.send(
            'Account has been deactivated',
            `<p>You have reached the maximum login attempt. Please try again later</p>`,
        )
    }
}