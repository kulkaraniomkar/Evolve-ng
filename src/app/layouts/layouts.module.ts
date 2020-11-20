import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  LayoutMainComponent } from './main/main.component';
import { SharedModule } from '../shared.module';
import { LayoutModule } from '../components/layout.module';

const COMPONENTS = [LayoutMainComponent];

@NgModule({
  imports: [SharedModule, LayoutModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class LayoutsModule { }
