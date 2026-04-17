export interface MailAdapter {
  sendVerificationCode: (to: string, code: string) => Promise<void>;
}
