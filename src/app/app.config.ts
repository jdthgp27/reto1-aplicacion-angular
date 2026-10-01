import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ELEMENTO_REPOSITORY } from './domain/ports/elemento.repository';
import { LocalStorageElementoRepository } from './infrastructure/adapters/local-storage-elemento.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: ELEMENTO_REPOSITORY,
      useClass: LocalStorageElementoRepository,
    },
  ],
};