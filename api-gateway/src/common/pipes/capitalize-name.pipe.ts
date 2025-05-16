import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class CapitalizeNamePipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!value || typeof value !== 'string') {
      return value;
    }

    const lowerCaseValue = value.toLowerCase().trim();

    const words = lowerCaseValue.split(' ').filter((word) => word.length > 0);

    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    return capitalizedWords.join(' ');
  }
}
