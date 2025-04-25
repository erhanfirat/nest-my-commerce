import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserRole } from '../types/roles.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (!user) {
      return false;
    }
    
    return user.role === UserRole.ADMIN || user.role === UserRole.SUPER_ADMIN;
  }
}
