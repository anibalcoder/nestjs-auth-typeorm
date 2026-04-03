import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../enums/valid-roles.enum';
import { META_ROLES } from '../constants/metadata.constant';

export const RequiredRoles = (...args: ValidRoles[]) =>
  SetMetadata(META_ROLES, args);
