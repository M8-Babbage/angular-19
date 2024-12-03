import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * * Inhabilitar ZoneJS y activar Angular Zoneless
     * ? No olvidar Zone.js de angular.json y package.json
     */
    // provideZoneChangeDetection({ eventCoalescing: true })
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
  ],
};
