import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS, 
        },
        defaults: {
        from: '"No Reply" <no-reply@example.com>',  
      },
    });

    async sendResetCode(email: string, code: string) {
        const mailOptions = {
            from: `"FCIHub Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Password Reset Code',
            text: `Your password reset code is: ${code}`,
            html: `<p>Hello 👋,</p>
             <p>Your password reset code is:</p>
             <h2>${code}</h2>
             <p>This code will expire in 15 minutes.</p>`,
        };

        await this.transporter.sendMail(mailOptions);
    }
}
