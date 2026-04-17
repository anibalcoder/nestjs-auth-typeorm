import { Module } from '@nestjs/common';
import { NodemailerAdapter } from './adapters/nodemailer.adapter';

@Module({
  providers: [NodemailerAdapter],
  exports: [NodemailerAdapter],
})
export class MailModule {}
