import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TranslationModule } from './translation.module';

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
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TranslationModule.forRoot(translationConfig)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
