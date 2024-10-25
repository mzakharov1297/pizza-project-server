import { Module } from '@nestjs/common';
import { ResendEmailController } from './resend-email.controller';
import { ResendEmailService } from './resend-email.service';

@Module({
  providers: [ResendEmailService],
  controllers: [ResendEmailController],
})
export class ResendEmailModule {}