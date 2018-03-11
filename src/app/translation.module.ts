import { NgModule } from '@angular/core';

import { TranslationPipe } from './translation.pipe';
import { TranslationConfig } from './translation-config.interface';
import { TranslationService /*, TRANSLATION_DI_CONFIG */ } from './translation.service';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    declarations: [
        TranslationPipe
    ],
    exports: [TranslationPipe]
})
export class TranslationModule {
    static forRoot(config: TranslationConfig) {
        return {
            ngModule: TranslationModule,
            providers: [
                // { provide: TRANSLATION_DI_CONFIG, useValue: config, multi: false },
                // TranslationService
                {
                    provide: TranslationService,
                    useFactory: () => (new TranslationService(config))
                }
            ]
        };
    }
}
