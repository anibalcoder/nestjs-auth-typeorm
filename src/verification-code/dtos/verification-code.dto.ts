import { IsEmail, IsEnum, IsString, Matches, MaxLength } from 'class-validator';
import { VerificationCodeEnum } from '../enums/verification-code.enum';

export class VerificationCodeDto {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @Matches(/^\d{6}$/, {
    message: 'El código debe tener exactamente 6 dígitos numéricos',
  })
  code: string;

  @IsEnum(VerificationCodeEnum)
  type: VerificationCodeEnum;
}
