import { Injectable, Inject, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { TranslationConfig } from './translation-config.interface';
import { Translation } from './translation.interface';
import { TranslationOptions } from './translation-options.interface';

// export const TRANSLATION_DI_CONFIG = new InjectionToken<TranslationConfig>('Translations')

@Injectable()
export class TranslationService {

  readonly languageChange: BehaviorSubject<string>;

  get languages(): string[] {
    return this.config.translations.map(v => v.code);
  }

  get language(): string {
    return this.languageChange.value;
  }

  set language(code: string) {
    this.throwErrorIfLanguageNotExists(code);
    this.languageChange.next(this.config.default = code);
  }

  readonly translationChange: BehaviorSubject<string>;

  get translations(): Translation[] {
    return this.config.translations;
  }

  get translation(): Translation {
    return this.config.translations.find(v => v.code === this.config.default);
  }

  set translation(translation: Translation) {
    const code = translation.code;
    const index = this.config.translations.findIndex(v => v.code === code);

    if (index > -1) {
      const oldTranslation = this.config.translations[index];
      const translations = this.config.translations.filter(v => v.code !== code);
      this.config.translations = [...translations, { ...oldTranslation, ...translation }];
      this.translationChange.next(code);
      return;
    }

    this.config.translations = [...this.config.translations, translation];
  }

  protected capitalizeRegex = new RegExp(/^[!¡?¿? *]{0,}[a-zàáèéìíòóùú]/);

  constructor(/* @Inject(TRANSLATION_DI_CONFIG) */ protected config: TranslationConfig) {
    if (!this.translations.length) {
      throw new Error(`The translations array can't be empty.`);
    }
    this.throwErrorIfLanguageNotExists(config.default);

    this.languageChange = new BehaviorSubject<string>(config.default);
    this.translationChange = new BehaviorSubject<string>(config.default);
  }

  public of(key: string, options: TranslationOptions = { capitalize: false, uppercase: false }): string {
    const code = options.lang || this.config.default;
    this.throwErrorIfLanguageNotExists(code);

    const data = this.config.translations.find(v => v.code === code);
    let value = data.values[key];

    if (!value) {
      throw new Error(`The key ${key} doesn't exist in the dictionary of ${code}.`);
    }

    if (options.capitalize) {
      value = this.capitalize(value);
    }

    if (options.uppercase) {
      value = value.toUpperCase();
    }

    return value;
  }

  protected throwErrorIfLanguageNotExists(code: string): void {
    if (this.config.default !== code && !this.config.translations.find(v => v.code === code)) {
      const codes = this.config.translations.map(v => `"${v.code}"`).join(', ');
      throw new Error(`The translation code "${code}" doesn't exist in the translations provided: ${codes}.`);
    }
  }

  protected capitalize(value: string = '', words: boolean = false): string {
    value = value || '';
    if (words) {
      return value.split(' ').map(word => this.capitalize(word, false)).join(' ');
    }
    let r: any = this.capitalizeRegex.exec(value);
    return (r = r && r[0]) ? (value).replace(r, r.toUpperCase()) : value;
  }

}
