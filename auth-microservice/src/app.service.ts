import { LoginDto, UserDto, UserResponseDto } from '@ecommerce/types';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    private jwtService: JwtService,
    @Inject('USERS_MICROSERVICE') private usersMicroservice: ClientProxy,
  ) {}

  async validateUser(email: string, password: string) {
    const user: UserDto = await firstValueFrom(
      this.usersMicroservice.send(
        {
          cmd: 'Users.FindByEmail',
        },
        email,
      ),
    );

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    const responseUser = new UserResponseDto(user);

    return this.generateJwtToken(responseUser);
  }

  generateJwtToken(user: Partial<UserResponseDto>) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  verify(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
