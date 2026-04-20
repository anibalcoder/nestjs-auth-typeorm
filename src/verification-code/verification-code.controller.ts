import { Body, Controller, Post } from '@nestjs/common';
import { VerificationCodeService } from './verification-code.service';
import { VerificationCodeDto } from './dtos/verification-code.dto';

@Controller('verification-code')
export class VerificationCodeController {
  constructor(private readonly verificationService: VerificationCodeService) {}

  @Post()
  verifyCode(@Body() verificationCodeDto: VerificationCodeDto) {
    return this.verificationService.verifyCode(verificationCodeDto);
  }
}
