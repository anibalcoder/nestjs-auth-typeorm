/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from 'src/users/entities/user.entity';
import { META_ROLES, META_ALLOW_OWNER } from '../constants/metadata.constant';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    const allowOwnerParam: string = this.reflector.get(
      META_ALLOW_OWNER,
      context.getHandler(),
    );

    if (validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    for (const rol of user.roles) {
      if (validRoles.includes(rol)) return true;
    }

    if (allowOwnerParam) {
      // * En escenarios más complejos, el ownership puede requerir consulta a DB (ej: posts, orders)
      const isOwner = req.params[allowOwnerParam] === user.id;
      if (isOwner) return true;
    }

    throw new ForbiddenException('No tienes permisos para este recurso');
  }
}
