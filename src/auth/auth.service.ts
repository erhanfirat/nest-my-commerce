import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/service/users.service';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<User> | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && password === user.password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: pass, ...result } = user;
      return result;
    }
    return null;
  }
  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user || loginDto.password !== user.password) {
      throw new UnauthorizedException('Geçersiz e-posta veya şifre');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
