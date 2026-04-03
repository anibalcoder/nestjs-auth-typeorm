import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);

    return {
      access_token: this.getJwtToken({ sub: newUser!.id }),
      ...newUser,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userService.findOne(email);

    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid)
      throw new UnauthorizedException('Credenciales inválidas');

    return {
      access_token: this.getJwtToken({ sub: user.id }),
      user: {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        nickname: user.nickname,
        email: user.email,
      },
    };
  }

  getJwtToken({ sub }: JwtPayload) {
    /**
     * Genera un JWT (JSON Web Token) firmado por el servidor.
     * El payload debe ser un objeto (recomendado).
     * Los claims son propiedades del payload que describen al usuario/token (no obligatorios, pero estándar).
     * `sub` es un claim estándar recomendado para identificar al usuario.
     */
    return this.jwtService.sign({ sub });
  }
}
