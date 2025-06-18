import {
  ApplicationConfig,
  provideZonelessChangeDetection, isDevMode,
} from '@angular/core'; // <--- 1. IMPORT THIS
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    // 2. Add the provider here. This tells Angular to run in Zoneless mode.
    provideZonelessChangeDetection(),

    provideRouter(routes),
    provideHttpClient(), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
  ],
};
