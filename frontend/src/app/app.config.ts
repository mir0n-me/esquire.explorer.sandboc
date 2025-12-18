import {ApplicationConfig, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import { provideHttpClient } from "@angular/common/http";
import {BASE_PATH} from "../rest";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideHttpClient(),
    provideZonelessChangeDetection(),
    {
      provide: BASE_PATH,
      useFactory: () => "http://localhost:3000"
    }]
};
