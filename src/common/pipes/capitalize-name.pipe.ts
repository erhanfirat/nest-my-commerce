import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class CapitalizeNamePipe implements PipeTransform<string, string> {
  transform(value: string, _metadata: ArgumentMetadata): string {
    if (!value || typeof value !== 'string') {
      return value;
    }

    // Önce tüm string'i küçük harfe çeviriyoruz
    const lowerCaseValue = value.toLowerCase().trim();

    // Boşluklara göre kelimelere ayırıyoruz
    const words = lowerCaseValue.split(' ').filter((word) => word.length > 0);

    // Her kelimenin ilk harfini büyütüyoruz
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Birleştirip döndürüyoruz
    return capitalizedWords.join(' ');
  }
}
