# Angular Translation

This library provides a simple and lightweight way to translate offline content.

## Installation

```bash
npm i --save ng2-translation
// or
npm i --save https://github.com/ticdenis/ng2-translation
```

## Usage

Import the **TranslationModule** and set the default language and available translations to your module:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslationModule } from 'ng2-translation';
import { AppComponent } from './app';

const translationConfig = {
  default: 'en', /* recommended to obtain/save the value of cookies */
  translations: [
    { code: 'es', values: { 'hello': 'hola', 'goodbye': 'adiós' } },
    { code: 'en', values: { 'hello': 'hello', 'goodbye': 'goodbye' } },
    { code: 'de', values: { 'hello': 'hallo', 'goodbye': 'abschied' } },
    { code: 'jp', values: { 'hello': 'こんにちは', 'goodbye': 'さようなら' } },
  ]
};

@NgModule({
  imports:[
    BrowserModule,
    TranslationModule.forRoot(translationConfig) /* required */
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

## Example

```typescript
import { Component } from '@angular/core';
import { TranslationService } from 'ng2-translation';

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
```