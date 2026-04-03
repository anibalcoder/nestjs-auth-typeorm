import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { validate as isUUID } from 'uuid';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const userEntity = this.usersRepository.create(createUserDto);

      userEntity.password = bcrypt.hashSync(userEntity.password, 10);

      /**
       * Flujo: create → save → hooks → INSERT DB.
       * Los hooks solo se ejecutan si se pasa la misma instancia de entidad durante todo el flujo.
       * Usar spread ({ ...userEntity }) crea una nueva instancia y rompe los hooks.
       */
      const persistedUser = await this.usersRepository.save(userEntity);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, isActive, roles, ...safeUser } = persistedUser;
      return safeUser;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.usersRepository.find({
      take: limit,
      skip: offset,
      order: {
        createdAt: 'DESC',
      },
      select: {
        id: true,
        name: true,
        lastName: true,
        nickname: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(term: string) {
    const buildWhere = isUUID(term)
      ? { id: term }
      : [{ email: term }, { nickname: term }];

    const user = await this.usersRepository.findOne({ where: buildWhere });

    if (!user) throw new NotFoundException('Usuario no existe');
    return user;
  }

  async updateById(userId: string, updateUserDto: UpdateUserDto) {
    const userToUpdate = await this.usersRepository.update(
      userId,
      updateUserDto,
    );

    if (userToUpdate.affected === 0)
      throw new NotFoundException(`Usuario #${userId} no encontrado`);

    return `Usuario #${userId} actualizado correctamente`;
  }

  async deleteById(userId: string) {
    const userToDelete = await this.usersRepository.delete({ id: userId });

    if (userToDelete.affected === 0)
      throw new NotFoundException(`Usuario #${userId} no encontrado`);

    return `Usuario #${userId} eliminado correctamente`;
  }

  handleDBExceptions(error: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.code === '23505') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException(
      'Ocurrió un error inesperado en el servidor. Intente nuevamente más tarde.',
    );
  }
}
