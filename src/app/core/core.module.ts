import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SorterService } from './sorter.service';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    const msg = `${moduleName} has already been loaded. Import Core modules in the AppModule only.`;
    throw new Error(msg);
  }
}

@NgModule({
   declarations: [
    FooterComponent,
    NavbarComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent
  ],
  providers: [ SorterService ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
