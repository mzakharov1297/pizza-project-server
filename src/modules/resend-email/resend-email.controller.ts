import { Body, Controller, Post } from '@nestjs/common';
import { ResendEmailService } from './resend-email.service';

@Controller('email')
export class ResendEmailController {
  constructor(private readonly resendEmailService: ResendEmailService) {}

  @Post()
  async sendEmail(
    @Body("to") to:string[],
    @Body("subject") subject: string,
    @Body("template") template: string,
  ) {
    return this.resendEmailService.sendEmail(to, subject, template);
  }
}