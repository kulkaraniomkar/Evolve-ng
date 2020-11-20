import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { selectSetting } from 'src/app/store/selectors/setting.selector';
import * as SettingsActions from  '../../store/actions/settings.actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class LayoutMainComponent implements OnInit {
  isLightTheme: boolean
  isMenuCollapsed: boolean
  isBorderless: boolean
  isSquaredBorders: boolean
  isFixedWidth: boolean
  isMenuShadow: boolean
  isMobileView: boolean
  isMenuTop: boolean
  isMobileMenuOpen: boolean

  coldLoad: boolean = true
  constructor(
    private _store: Store<IAppState>
  ) {
    this._store.pipe(select(selectSetting)).subscribe(
      state => {
        this.isLightTheme = state.isLightTheme
        this.isMenuCollapsed = state.isMenuCollapsed
        this.isBorderless = state.isBorderless
        this.isSquaredBorders = state.isSquaredBorders
        this.isFixedWidth = state.isFixedWidth
        this.isMenuShadow = state.isMenuShadow
        this.isMobileView = state.isMobileView
        this.isMenuTop = state.isMenuTop
        this.isMobileMenuOpen = state.isMobileMenuOpen
      }
    );
   }

  ngOnInit() {
    this._store.dispatch(new SettingsActions.GetSettingAction())
  }
  onCollapse(value: any) {
    this._store.dispatch(
      new SettingsActions.SetSettingAction({
        isMenuCollapsed: value,
      }),
    )
  }

  toggleTheme() {
    this._store.dispatch(
      new SettingsActions.SetSettingAction({
        isLightTheme: !this.isLightTheme,
      }),
    )
  }

  toggleCollapsed() {
    this._store.dispatch(
      new SettingsActions.SetSettingAction({
        isMenuCollapsed: !this.isMenuCollapsed,
      }),
    )
  }

  toggleMobileMenu() {
    this._store.dispatch(
      new SettingsActions.SetSettingAction({
        isMobileMenuOpen: !this.isMobileMenuOpen,
      }),
    )
  }
}
