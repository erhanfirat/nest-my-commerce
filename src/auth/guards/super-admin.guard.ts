import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { RequestWithUser } from 'src/common/types/types';
import { UserRole } from 'src/users/utils/types';

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
