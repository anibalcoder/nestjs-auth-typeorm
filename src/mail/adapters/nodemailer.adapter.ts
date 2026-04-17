import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer, { Transporter } from 'nodemailer';
import { MailAdapter } from '../interfaces/mail-adapter.interface';
import { VerifyCodeEmailTemplate } from '../templates/verify-code-email.template';
import { render } from '@react-email/render';
import { createElement } from 'react';

@Injectable()
export class NodemailerAdapter implements MailAdapter {
  private readonly transporter: Transporter;
  private readonly fromEmail: string;

  constructor(private readonly configService: ConfigService) {
    const user = configService.getOrThrow<string>('EMAIL_USER');
    const pass = configService.getOrThrow<string>('EMAIL_APP_PASSWORD');

    this.fromEmail = user;

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
  }

  async sendVerificationCode(to: string, code: string) {
    try {
      const verifyCodeEmail = await render(
        createElement(VerifyCodeEmailTemplate, { email: to, code }),
      );

      const options = {
        from: this.fromEmail,
        to,
        subject: `${code} es tu código para verificar tu identidad.`,
        html: verifyCodeEmail,
      };

      await this.transporter.sendMail(options);
    } catch {
      throw new InternalServerErrorException('No se pudo enviar el correo');
    }
  }
}
