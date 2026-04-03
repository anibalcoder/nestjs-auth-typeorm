import { SetMetadata } from '@nestjs/common';
import { META_ALLOW_OWNER } from '../constants/metadata.constant';

export const AllowOwner = (params: string) =>
  SetMetadata(META_ALLOW_OWNER, params);
