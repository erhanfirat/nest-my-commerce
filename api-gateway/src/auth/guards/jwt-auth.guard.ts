import { AUTH_PATTERNS, JwtPayload, SERVICES } from '@ecommerce/types';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RequestWithUser } from 'src/common/types/types';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(SERVICES.AUTH.name) private authMicroservice: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<RequestWithUser>();
    const authHeader = req.headers.authorization;
    if (!authHeader) return false;

    const token = authHeader.replace('Bearer ', '');
    try {
      const userJwt = await firstValueFrom<JwtPayload>(
        this.authMicroservice.send({ cmd: AUTH_PATTERNS.VERIFY }, token),
      );
      req.user = {
        id: userJwt.sub,
        email: userJwt.email,
        role: userJwt.role,
      };
      return true;
    } catch (err) {
      console.error('JwtAuthGuard err > ', err);
      return false;
    }
  }
}
