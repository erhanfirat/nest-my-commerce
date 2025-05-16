import { UserRole } from '@ecommerce/types';
import { Request } from 'express';
export interface RequestWithUser extends Request {
  user: RequestUser;
  role: UserRole;
}

export type RequestUser = {
  id: number;
  email: string;
  role: UserRole;
};
