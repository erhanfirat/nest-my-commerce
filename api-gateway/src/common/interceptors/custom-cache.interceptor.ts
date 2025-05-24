import { CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { RequestWithUser } from '../types/types';
import { UserRole } from '@ecommerce/types';

@Injectable()
export class CustomCacheInterceptor extends CacheInterceptor {
  protected getCacheKey(context: ExecutionContext): string {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const queryParams = Object.keys(request.query)
      .sort()
      .map((key) => `${key}=${request.query[key]}`)
      .join('&');

    return `${request.path}${queryParams ? '?' + queryParams : ''}`;
  }

  protected getTtl(context: ExecutionContext): number | undefined {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    if (request.user?.role === UserRole.ADMIN) {
      return 60000; // Adminler için daha kısa cache
    }
    return 300000; // Varsayılan 5 dakika
  }
}
