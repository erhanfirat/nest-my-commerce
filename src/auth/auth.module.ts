import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminGuard } from './guards/admin.guard';
import { SuperAdminGuard } from './guards/super-admin.guard';

@Global()
@Module({
  providers: [AuthService, AdminGuard, SuperAdminGuard],
  exports: [AuthService, AdminGuard, SuperAdminGuard],
})
export class AuthModule {}
