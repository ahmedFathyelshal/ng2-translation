import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from './translation.service';
import { TranslationOptions } from './translation-options.interface';

@Pipe({ name: 'translate', pure: false })
export class TranslationPipe implements PipeTransform {

  constructor(private translate: TranslationService) { }

  transform(value: string, lang?: string, capitalize?: boolean, uppercase?: boolean): string {
    return this.translate.of(value, {
      lang: lang || this.translate.language,
      capitalize: capitalize || false,
      uppercase: uppercase || false,
    });
  }

}
