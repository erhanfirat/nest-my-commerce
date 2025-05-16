import { LoginDto } from '@ecommerce/types';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_MICROSERVICE') private readonly authMicroservice: ClientProxy,
  ) {}

  login(loginDto: LoginDto) {
    console.log('API GATEWAY > Service > login ', loginDto);

    return this.authMicroservice.send({ cmd: 'auth.login' }, loginDto);
  }

  generateJwtToken(user: Partial<UserResponseDto>) {
    return this.authMicroservice.send({ cmd: 'auth.me' }, user);
  }
}
