import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.example.com",
      port: 587,
      secure: false,
      auth: {
        user: "your-email@example.com",
        pass: "your-email-password",
      },
    });
  }

  async sendVerificationEmail(email: string, token: string) {
    const url = `http://localhost:3000/auth/verify-email?token=${token}`;
    await this.transporter.sendMail({
      from: '"Your App" <your-email@example.com>',
      to: email,
      subject: "Email Verification",
      html: `Please click the following link to verify your email: <a href="${url}">Verify Email</a>`,
    });
  }
}
