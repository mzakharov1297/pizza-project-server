import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import * as process from 'node:process';

@Injectable()
export class ResendEmailService {
  private resend: Resend

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendEmail(to: string[], subject: string, template: string) {
    try {
      const data = await this.resend.emails.send({
        from: 'onboarding@resend.dev',
        to,
        subject,
        html: template,
      });
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}