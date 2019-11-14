import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { AppDevModule } from './app/app-dev.module';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule)
platformBrowserDynamic()
  .bootstrapModule(AppDevModule)
  .catch(err => console.log(err));
