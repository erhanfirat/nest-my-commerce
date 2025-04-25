import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './common/shared.module';

@Module({
  imports: [
    SharedModule,
    UsersModule,
    ProductsModule,
    OrderModule,
    PaymentModule,
    AuthModule,
  ],
})
export class AppModule {}
