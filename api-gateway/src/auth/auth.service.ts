import { AUTH_PATTERNS, LoginDto, SERVICES } from '@ecommerce/types';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RequestUser } from 'src/common/types/types';
@Injectable()
export class AuthService {
  constructor(
    @Inject(SERVICES.AUTH.name) private readonly authMicroservice: ClientProxy,
  ) {}

  login(loginDto: LoginDto) {
    console.log('API GATEWAY > Service > login ', loginDto);

    return this.authMicroservice.send({ cmd: AUTH_PATTERNS.LOGIN }, loginDto);
  }

  generateJwtToken(user: RequestUser) {
    return this.authMicroservice.send({ cmd: AUTH_PATTERNS.ME }, user);
  }
}
