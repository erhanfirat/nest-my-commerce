import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { UserRole, UserType } from '@ecommerce/types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // @Roles custom decorator ından gelen roller
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) return true;

    console.log('requiredRoles > ', requiredRoles);
    // JWT -> Request Autherization header
    const { user } = context
      .switchToHttp()
      .getRequest<Request & { user: UserType }>();

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Yetkiniz bulunmamaktadır.');
    }
    return true;
  }
}
