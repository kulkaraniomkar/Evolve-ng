import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ChartistModule } from 'ng-chartist';
import { SharedModule } from 'src/app/shared.module';
import { FooterComponent } from './layout-components/footer/footer.component';
import { BreadcrumbsComponent } from './layout-components/breadcrumbs/breadcrumbs.component';
import { MenuTopComponent } from './layout-components/menu/menu-top/menu-top.component';
import { MenuLeftComponent } from './layout-components/menu/menu-left/menu-left.component';
import { SettingsComponent } from './layout-components/settings/settings.component';
import { TopbarComponent } from './layout-components/topbar/topbar.component';
import { TopbarUserMenuComponent } from './layout-components/usermenu/user-menu.component';
import { EmuiModule } from './emuicomponents/emui.module';




const COMPONENTS = [
    TopbarUserMenuComponent,
    TopbarComponent,
    MenuTopComponent,
    MenuLeftComponent,
    SettingsComponent,
    FooterComponent,
    BreadcrumbsComponent,
]

@NgModule({
    imports: [SharedModule, FormsModule, ReactiveFormsModule, PerfectScrollbarModule, ChartistModule, EmuiModule],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS],
})
export class LayoutModule { }
