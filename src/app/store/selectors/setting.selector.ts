 import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { ISettingState } from '../state/setting.state';

const selectSettingState = (state: IAppState) => state.setting;

export const selectSetting = createSelector(
  selectSettingState,
  (state: ISettingState) => state.setting
);
