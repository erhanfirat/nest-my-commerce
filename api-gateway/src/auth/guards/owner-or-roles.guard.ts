// common/guards/owner-or-roles.guard.ts

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestWithUser } from 'src/common/types/types';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { UserRole } from '@ecommerce/types';

@Injectable()
export class OwnerOrRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;
    const paramId = Number(request.params.id);

    if (!user) throw new ForbiddenException('Kullanıcı doğrulanamadı');

    const allowedRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const isRoleAllowed = user.role && allowedRoles?.includes(user.role);
    const isOwner = user.id === paramId;

    if (isOwner || isRoleAllowed) {
      return true;
    }

    throw new ForbiddenException(
      'Bu işlemi yapmak için yetkiniz bulunmamaktadır.',
    );
  }
}
