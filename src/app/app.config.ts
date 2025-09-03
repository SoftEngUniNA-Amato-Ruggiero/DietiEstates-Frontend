import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { authConfig } from './_config/auth.config';
import { provideAuth } from 'angular-auth-oidc-client';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './_interceptors/auth-interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete';
import * as MapConstants from './_constants/map-component.constants';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAuth(authConfig),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor]) // Assuming authInterceptor is defined elsewhere
    ),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    importProvidersFrom(GeoapifyGeocoderAutocompleteModule.withConfig(MapConstants.GEOAPIFY_API_KEY))
  ]
};
