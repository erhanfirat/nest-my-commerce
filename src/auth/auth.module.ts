import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminGuard } from './guards/admin.guard';
import { SuperAdminGuard } from './guards/super-admin.guard';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt/JwtStrategy';
import { AuthController } from './auth.controller';

@Global()
@Module({
  imports: [
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET')!,
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [AuthService, AdminGuard, SuperAdminGuard, JwtStrategy],
  exports: [AuthService, AdminGuard, SuperAdminGuard],
  controllers: [AuthController],
})
export class AuthModule {}
