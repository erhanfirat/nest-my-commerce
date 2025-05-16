import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RequestWithUser } from 'src/common/types/types';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject('AUTH_SERVICE') private authMicroservice: ClientProxy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<RequestWithUser>();
    const authHeader = req.headers.authorization;
    if (!authHeader) return false;

    const token = authHeader.replace('Bearer ', '');
    try {
      const user = await firstValueFrom<Partial<UserResponseDto>>(
        this.authMicroservice.send({ cmd: 'auth.verify' }, token),
      );
      req.user = user;
      return true;
    } catch (err) {
      console.error('JwtAuthGuard err > ', err);
      return false;
    }
  }
}
