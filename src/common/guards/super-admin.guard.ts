import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRole } from '../types/roles.enum';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (!user) {
      return false;
    }
    
    return user.role === UserRole.SUPER_ADMIN;
  }
}
