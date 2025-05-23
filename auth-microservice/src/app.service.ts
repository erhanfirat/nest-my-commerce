import {
  JwtPayload,
  LoginDto,
  SERVICES,
  USER_PATTERNS,
  UserDto,
  UserResponseDto,
} from '@ecommerce/types';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    private jwtService: JwtService,
    @Inject(SERVICES.USERS.name) private usersMicroservice: ClientProxy,
  ) {}

  async validateUser(email: string, password: string) {
    console.log(
      'auth microservice > service.ts > validate user > ',
      email,
      password,
    );
    const user: UserDto = await firstValueFrom(
      this.usersMicroservice.send(
        {
          cmd: USER_PATTERNS.FIND_BY_EMAIL,
        },
        email,
      ),
    );
    console.log(
      'auth microservice > service.ts > user microservice findbyemail result user > ',
      user,
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

  verify(token: string): JwtPayload {
    try {
      return this.jwtService.verify<JwtPayload>(token); // JwtPayload Dönüyor
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async me(jwtPayload: JwtPayload) {
    const user: UserDto = await firstValueFrom(
      this.usersMicroservice.send(
        {
          cmd: USER_PATTERNS.FIND_ONE,
        },
        jwtPayload.sub,
      ),
    );
    const responseUser = new UserResponseDto(user);

    return this.generateJwtToken(responseUser);
  }
}
