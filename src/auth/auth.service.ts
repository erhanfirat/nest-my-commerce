import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserRole } from 'src/users/utils/types';

interface AuthUser {
  id: number;
  email: string;
  role: UserRole;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  validateUser(email: string, password: string): AuthUser {
    // Normalde veritabanında arama yapılacak, burada örnek olarak:
    if (email === 'admin@example.com' && password === 'admin123') {
      this.logger.log(`Kullanıcı giriş yaptı: ${email}`);
      return { id: 1, email, role: UserRole.ADMIN };
    }

    if (email === 'super@example.com' && password === 'super123') {
      this.logger.log(`Kullanıcı giriş yaptı: ${email}`);
      return { id: 2, email, role: UserRole.SUPER_ADMIN };
    }

    if (email === 'user@example.com' && password === 'user123') {
      this.logger.log(`Kullanıcı giriş yaptı: ${email}`);
      return { id: 3, email, role: UserRole.USER };
    }

    throw new UnauthorizedException('Geçersiz email veya şifre');
  }

  // Diğer auth metodları eklenebilir
}
