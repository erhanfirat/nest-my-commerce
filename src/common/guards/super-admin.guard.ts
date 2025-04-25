import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRole } from '../types/roles.enum';

interface RequestUser {
  role?: UserRole;
}

interface RequestWithUser extends Request {
  user?: RequestUser;
}

@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Kullanıcı bilgisi bulunamadı');
    }

    if (user.role === UserRole.SUPER_ADMIN) {
      return true;
    }

    throw new UnauthorizedException(
      'Bu işlem için Süper Admin yetkisi gereklidir',
    );
  }
}
