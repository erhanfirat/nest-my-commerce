import { UserDto, UserRole } from '@ecommerce/types';
import { Request } from 'express';
export interface RequestWithUser extends Request {
  user: Partial<UserDto>;
  role: UserRole;
}
