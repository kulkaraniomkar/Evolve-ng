import { NgModule } from '@angular/core';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

import { HttpClientInMemoryWebApiModule, InMemoryDbService } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './core/in-memory-data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    AppModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
      delay: 250,
      passThruUnknownUrl: true
    }),
    BrowserAnimationsModule
  ],
  providers: [ { provide: InMemoryDataService, useExisting: InMemoryDbService } ],
  bootstrap: [ AppComponent ]
})
export class AppDevModule {}
