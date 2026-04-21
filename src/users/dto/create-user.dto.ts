import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  lastName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  nickname: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({
    description: `La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.`,
  })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message:
      'La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.',
  })
  password: string;

  @ApiProperty({
    example: [ValidRoles.USER],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  roles?: string[];
}
