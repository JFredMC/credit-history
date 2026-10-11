import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { CREDIT_API } from './core/services/credit-api';
import { MockCreditApi } from './core/services/mock-credit-api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    // To use the NestJS backend: add provideHttpClient() and swap for HttpCreditApi.
    { provide: CREDIT_API, useClass: MockCreditApi },
  ],
};
