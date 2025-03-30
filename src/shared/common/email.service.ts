import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { AppConfig } from "../common/appConfig";


@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendVerificationEmail(email: string, token: string) {
    const url = `${AppConfig?.HOST}/auth/verify-email?token=${token}`;
    await this.transporter.sendMail({
      from: "thegreatbulls@gmail.com",
      to: email,
      subject: "Email Verification",
      html: `Please click the following link to verify your email: <a href="${url}">Verify Email</a>`,
    });
  }
}
