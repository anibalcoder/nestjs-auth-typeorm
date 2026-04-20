import { BadRequestException, Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { VerificationCodeDto } from './dtos/verification-code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VerificationCode } from './entities/verification-code.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class VerificationCodeService {
  constructor(
    @InjectRepository(VerificationCode)
    private readonly verificationCodeRepository: Repository<VerificationCode>,

    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async create(verificationCodeDto: VerificationCodeDto) {
    const newCode = this.verificationCodeRepository.create({
      ...verificationCodeDto,
      expiresAt: this.calculateExpirationDate(),
    });

    return this.verificationCodeRepository.save(newCode);
  }

  async verifyCode(verificationCodeDto: VerificationCodeDto) {
    const { email, code, type } = verificationCodeDto;

    const storedCode = await this.verificationCodeRepository.findOne({
      where: {
        email: email.trim().normalize('NFC').toLowerCase(),
        isUsed: false,
        type,
      },
      order: { createdAt: 'DESC' },
    });

    if (!storedCode) {
      throw new BadRequestException('Código inválido o no encontrado');
    }

    if (storedCode.expiresAt && new Date() > storedCode.expiresAt) {
      throw new BadRequestException('El código ha expirado');
    }

    if (storedCode.attempts >= storedCode.maxAttempts)
      throw new BadRequestException('Máximo de intentos alcanzado');

    if (storedCode.code !== code) {
      // Incrementar intentos SOLO cuando falla
      storedCode.attempts += 1;
      await this.verificationCodeRepository.save(storedCode);
      throw new BadRequestException('Código incorrecto');
    }

    // Marcar como usado solo cuando es correcto
    storedCode.isUsed = true;
    await this.verificationCodeRepository.save(storedCode);

    const user = await this.userService.findOne(email);

    return {
      access_token: this.jwtService.sign({ sub: user.id }),
      user: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        nickname: user.nickname,
        email: user.email,
      },
    };
  }

  generateCode(): string {
    return randomInt(100000, 1000000).toString();
  }

  calculateExpirationDate(minutes: number = 2): Date {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + minutes);
    return expiresAt;
  }
}
