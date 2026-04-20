import { forwardRef, Module } from '@nestjs/common';
import { VerificationCodeController } from './verification-code.controller';
import { VerificationCodeService } from './verification-code.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationCode } from './entities/verification-code.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VerificationCode]),
    UsersModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [VerificationCodeController],
  providers: [VerificationCodeService],
  exports: [VerificationCodeService],
})
export class VerificationCodeModule {}
