import { AUTH_PATTERNS, LoginDto, UserResponseDto } from '@ecommerce/types';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authMicroservice: ClientProxy,
  ) {}

  login(loginDto: LoginDto) {
    console.log('API GATEWAY > Service > login ', loginDto);

    return this.authMicroservice.send({ cmd: AUTH_PATTERNS.LOGIN }, loginDto);
  }

  generateJwtToken(user: Partial<UserResponseDto>) {
    return this.authMicroservice.send({ cmd: AUTH_PATTERNS.ME }, user);
  }
}
