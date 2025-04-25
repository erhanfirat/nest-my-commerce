import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ConvertIsoToDatePipe implements PipeTransform<string, Date> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string, _metadata: ArgumentMetadata): Date {
    if (typeof value === 'string' && this.isIsoDate(value)) {
      return new Date(value);
    }
    return new Date();
  }

  private isIsoDate(value: unknown): value is string {
    if (typeof value !== 'string') return false;
    const isoOnlyDateRegex = /^\d{4}-\d{2}-\d{2}/;
    return isoOnlyDateRegex.test(value) && !isNaN(Date.parse(value));
  }
}
