import { Injectable } from '@nestjs/common';
import { UserRole } from '../common/types/roles.enum';

@Injectable()
export class AuthService {
  // Örnek implementasyon
  validateUser(email: string, password: string) {
    // Burada kullanıcı doğrulama işlemleri yapılacak
    return { id: 1, email, role: UserRole.USER };
  }

  // Diğer auth metodları eklenebilir
}
