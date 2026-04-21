import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Delete,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AllowOwner, Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '(Admin)' })
  @Auth(ValidRoles.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Auth()
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @ApiParam({
    name: 'term',
    description: 'Puede ser email, nickname o id del usuario',
    examples: {
      email: { value: 'user@mail.com' },
      nickname: { value: 'anibal' },
      id: { value: '00320607-632f-4026-8f55-0af027037194' },
    },
  })
  @Auth()
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.usersService.findOne(term);
  }

  @ApiOperation({ summary: '(Admin o propietario)' })
  @ApiParam({ name: 'id', example: '00320607-632f-4026-8f55-0af027037194' })
  @ApiBody({ type: UpdateUserDto })
  @Auth(ValidRoles.ADMIN)
  @AllowOwner('id')
  @Patch(':id')
  async updateById(
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const result = await this.usersService.updateById(userId, updateUserDto);
    return { result };
  }

  @ApiOperation({ summary: '(Admin o propietario)' })
  @ApiParam({ name: 'id', example: '00320607-632f-4026-8f55-0af027037194' })
  @Auth(ValidRoles.ADMIN)
  @AllowOwner('id')
  @Delete(':id')
  async deleteById(@Param('id', ParseUUIDPipe) userId: string) {
    const result = await this.usersService.deleteById(userId);
    return { result };
  }
}
