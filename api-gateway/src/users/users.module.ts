import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SERVICES } from '@ecommerce/types';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ClientsModule.register([
      {
        name: SERVICES.USERS.name,
        transport: Transport.TCP,
        options: {
          host: SERVICES.USERS.host,
          port: SERVICES.USERS.port,
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
