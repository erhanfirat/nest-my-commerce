import { UserRole } from '@ecommerce/types';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
