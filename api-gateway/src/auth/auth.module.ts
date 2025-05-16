import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICES } from '@ecommerce/types';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: SERVICES.AUTH.name,
        transport: Transport.TCP,
        options: { port: SERVICES.AUTH.port, host: SERVICES.AUTH.host },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard],
  exports: [JwtAuthGuard, ClientsModule],
})
export class AuthModule {}
