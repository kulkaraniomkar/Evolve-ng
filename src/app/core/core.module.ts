import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SorterService } from './sorter.service';
import { ToastService } from './toast.service';
import { MatSnackBar } from '@angular/material';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    const msg = `${moduleName} has already been loaded. Import Core modules in the AppModule only.`;
    throw new Error(msg);
  }
}

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [],
  exports: [],
  providers: [ SorterService, ToastService ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
