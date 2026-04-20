import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VerificationCodeEnum } from '../enums/verification-code.enum';

@Entity('verification-code')
export class VerificationCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 6 })
  code: string;

  @Column({
    type: 'enum',
    enum: VerificationCodeEnum,
  })
  type: VerificationCodeEnum;

  @Column({ default: 0 })
  attempts: number;

  @Column({ default: 5 })
  maxAttempts: number;

  @Column({ default: false })
  isUsed: boolean;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;

  @Column({ type: 'text', nullable: true })
  payload?: string;

  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  normalizeFields() {
    if (this.email)
      this.email = this.email.trim().normalize('NFC').toLowerCase();
  }
}
