import { applyDecorators, UseGuards } from '@nestjs/common';
import { RequiredRoles } from './required-roles.decorator';
import { UserRoleGuard } from '../guards/user-role.guard';
import { AuthGuard } from '@nestjs/passport';
import { ValidRoles } from '../enums/valid-roles.enum';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RequiredRoles(...roles),
    UseGuards(AuthGuard('jwt'), UserRoleGuard),
  );
}
