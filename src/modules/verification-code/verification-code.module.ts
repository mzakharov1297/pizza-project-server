import { Module } from '@nestjs/common';
import { VerificationCodeController } from './verification-code.controller';
import {VerificationCodeService} from "./verification-code.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {VerificationCode} from "./verification-code.entity";

@Module({
  controllers: [VerificationCodeController],
  providers: [VerificationCodeService],
  imports: [TypeOrmModule.forFeature([VerificationCode])],
})
export class VerificationCodeModule {}
