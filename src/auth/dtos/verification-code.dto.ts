import { IsEmail, IsString, Matches, MaxLength } from 'class-validator';

export class VerificationCodeDto {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @Matches(/^\d{6}$/, {
    message: 'El código debe tener exactamente 6 dígitos numéricos',
  })
  code: string;
}
