import { Component } from '@angular/core';
import { TranslationService } from './translation.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{ word | translate }} Angular</h1>
    <button (click)="randomLanguage()">Change</button>
  `
})
export class AppComponent {

  word: string = 'hello';

  constructor(private translate: TranslationService) {
    console.log(
      translate.of('hello'), // Outputs: 'hello'
      translate.of('hello', { capitalize: true }), // Outputs: 'Hello'
      translate.of('goodbye', { uppercase: true }), // Outputs: 'HELLO'
      translate.of('goodbye', { lang: 'es', capitalize: true }), // Outputs: 'Adiós'
    );
  }

  randomLanguage(): void {
    const codes = this.translate.languages.filter(code => code !== this.translate.language);
    this.translate.language = codes[Math.floor(Math.random() * codes.length)];
  }

}
