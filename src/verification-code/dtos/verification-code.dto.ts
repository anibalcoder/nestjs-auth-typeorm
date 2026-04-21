import { IsEmail, IsEnum, IsString, Matches, MaxLength } from 'class-validator';
import { VerificationCodeEnum } from '../enums/verification-code.enum';
import { ApiProperty } from '@nestjs/swagger';

export class VerificationCodeDto {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @Matches(/^\d{6}$/, {
    message: 'El código debe tener exactamente 6 dígitos numéricos',
  })
  code: string;

  @ApiProperty({
    default: VerificationCodeEnum.LOGIN,
  })
  @IsEnum(VerificationCodeEnum)
  type: VerificationCodeEnum;
}
