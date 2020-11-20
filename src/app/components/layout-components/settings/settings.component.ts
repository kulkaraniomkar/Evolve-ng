import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as SettingsActions from 'src/app/store/actions/settings.actions';
import { selectSetting } from 'src/app/store/selectors/setting.selector';

@Component({
  selector: 'emui-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  isSettingsOpen: boolean
  isMenuTop: boolean = false
  isMenuCollapsed: boolean = false
  isMenuShadow: boolean = false
  isLightTheme: boolean = false
  isBorderless: boolean = false
  isSquaredBorders: boolean = false
  isFixedWidth: boolean = false

  constructor(private store: Store<any>) {
    this.store.pipe(select(selectSetting)).subscribe(state => {
      this.isSettingsOpen = state.isSettingsOpen
      this.isMenuTop = state.isMenuTop
      this.isMenuCollapsed = state.isMenuCollapsed
      this.isMenuShadow = state.isMenuShadow
      this.isLightTheme = state.isLightTheme
      this.isBorderless = state.isBorderless
      this.isSquaredBorders = state.isSquaredBorders
      this.isFixedWidth = state.isFixedWidth
    })
  }

  settingChange(value: boolean, setting: string) {
    this.store.dispatch(
      new SettingsActions.SetSettingAction({
        [setting]: value,
      }),
    )
  }

  toggle() {
    this.store.dispatch(
      new SettingsActions.SetSettingAction({
        isSettingsOpen: !this.isSettingsOpen,
      }),
    )
  }

  close() {
    this.store.dispatch(
      new SettingsActions.SetSettingAction({
        isSettingsOpen: false,
      }),
    )
  }
}
