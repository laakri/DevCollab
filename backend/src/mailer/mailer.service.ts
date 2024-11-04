import { Injectable } from '@nestjs/common';
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestMailerService) {}

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(to right, #3b82f6, #8b5cf6); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Welcome to DevCollab!</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px; color: #374151;">Thank you for joining our community! Please verify your email to get started.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${body}" 
               style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Verify Email Address
            </a>
          </div>
          <p style="font-size: 14px; color: #6b7280;">If you didn't create an account, you can safely ignore this email.</p>
        </div>
      </div>
    `;

    await this.mailerService.sendMail({
      to,
      subject,
      html: htmlContent,
    });
  }
}
