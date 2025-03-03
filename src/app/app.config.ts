import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
  isDevMode,
  LOCALE_ID,
} from '@angular/core';
import {
  provideRouter,
  withViewTransitions,
  withRouterConfig,
  withInMemoryScrolling,
} from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { PropertyGateway } from './core/ports/property.gateway';
import { InMemoryPropertyGateway } from './core/adapters/in-memory/in-memory-property.gateway';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpPropertyGateway } from './core/adapters/http/http-property.gateway';
import { ArticleGateway } from './core/ports/article.gateway';
import { HttpArticleGateway } from './core/adapters/http/http-article.gateway';


registerLocaleData(localeFr, 'fr-FR');

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      })
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    importProvidersFrom(
      NgxsModule.forRoot([], { selectorOptions: { suppressErrors: false } }),
      NgxsFormPluginModule.forRoot(),
      NgxsReduxDevtoolsPluginModule.forRoot({
        disabled: !isDevMode(),
      }),
      NgxsStoragePluginModule.forRoot({
        keys: [],
      })
    ),
    {provide: PropertyGateway, useFactory: () => new HttpPropertyGateway()}, provideAnimationsAsync(),
    {provide: ArticleGateway, useFactory: () => new HttpArticleGateway()}, provideAnimationsAsync(),
  ],
};
