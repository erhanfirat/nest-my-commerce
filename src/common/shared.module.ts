import { Module, Global } from '@nestjs/common';
import { CapitalizeNamePipe } from './pipes/capitalize-name.pipe';
import { TransformResponseInterceptor } from './interceptors/transform-response.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Global()
@Module({
  providers: [
    CapitalizeNamePipe,
    TransformResponseInterceptor,
    HttpExceptionFilter,
  ],
  exports: [
    CapitalizeNamePipe,
    TransformResponseInterceptor,
    HttpExceptionFilter,
  ],
})
export class SharedModule {} 