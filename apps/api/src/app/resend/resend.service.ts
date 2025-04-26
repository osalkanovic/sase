import { Injectable, OnModuleInit } from '@nestjs/common';
import { Resend } from 'resend';
import { AppConfigService } from '../config/config.service';

@Injectable()
export class ResendService implements OnModuleInit {
  private _resend: Resend;
  constructor(private readonly appConfigService: AppConfigService) {}
  onModuleInit() {
    this._resend = new Resend(this.appConfigService.resendApiKey);
  }

  async sendMail(subject: string, html: string) {
    this._resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'omer.salkanovic@bloomteq.com',
      subject: subject,
      html: html,
    });
  }
}
