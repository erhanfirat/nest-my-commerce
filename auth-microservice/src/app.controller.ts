import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AUTH_PATTERNS, JwtPayload, LoginDto } from '@ecommerce/types';

@Controller()
export class AppController {
  constructor(private readonly authService: AppService) {}

  @MessagePattern({ cmd: AUTH_PATTERNS.LOGIN })
  login(@Payload() data: LoginDto) {
    console.log('AUTH MICROSERVICE > Controller > login ', data);

    return this.authService.login(data);
  }

  @MessagePattern({ cmd: AUTH_PATTERNS.VERIFY })
  verify(@Payload() token: string) {
    return this.authService.verify(token);
  }

  @MessagePattern({ cmd: AUTH_PATTERNS.ME })
  me(@Payload() user: JwtPayload) {
    return this.authService.me(user);
  }
}
