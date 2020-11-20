 
import { initialSettingState, ISettingState } from '../state/setting.state';
import { SettingActions, ESettingActions } from '../actions/settings.actions';

export function settingReducers(
  state = initialSettingState,
  action: SettingActions
): ISettingState {
  switch (action.type) {
    case ESettingActions.SET_SETTING: {
        const key = Object.keys(action.payload)[0];
        window.localStorage.setItem(`app.settings.${key}`, action.payload[key]);
        console.log(action.payload);
        console.log(state);
      return {
        ...state,
       setting: {...state.setting, ...action.payload}
      };
    }
  
    default:
      return state;
  }
};
