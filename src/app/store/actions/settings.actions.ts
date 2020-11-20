import { Action } from '@ngrx/store';

import { ISetting } from '../../models/setting.interface';

export enum ESettingActions {
  SET_SETTING = '[Set setting] SET_SETTING',
  CHANGE_SETTING = '[Change setting] CHANGE_SETTING',
  GET_SETTING = '[Get setting] GET_SETTING'
}  
/** Settings */
// export class SetSettingAction implements Action {
//   public readonly type = ESettingActions.SET_SETTING;
//   constructor(public payload: ISetting) {}
// }
export class SetSettingAction implements Action {
  public readonly type = ESettingActions.SET_SETTING;
  constructor(public payload: object) {}
}
export class GetSettingAction implements Action {
  public readonly type = ESettingActions.GET_SETTING;
}

export class ChangeSettingAction implements Action {
  readonly type = ESettingActions.CHANGE_SETTING;
  constructor(public payload: ISetting) {}
}

export type SettingActions = SetSettingAction | ChangeSettingAction | GetSettingAction;
