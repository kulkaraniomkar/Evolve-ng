import { RouterReducerState } from '@ngrx/router-store';

import { ISettingState, initialSettingState } from './setting.state';
import { ISubscriptionState, initialSubscriptionState } from './subscription.state';
import { IMenteeState, initialMenteeState } from './mentee.state';
import { IMatchState, initialMatchState } from './match.state';
import { IMentorState, initialMentorState } from './mentor.state';
import { IActivityState, initialActivityState } from './activity.state';
import { initialUserState, IUserState } from './user.state';



export interface IAppState {
  router?: RouterReducerState;
  setting: ISettingState;
  subscription: ISubscriptionState;
  mentee: IMenteeState;
  match: IMatchState;
  mentor: IMentorState;
  activity: IActivityState;
  user: IUserState;
}

export const initialAppState: IAppState = {
  setting: initialSettingState,
  subscription: initialSubscriptionState,
  mentee: initialMenteeState,
  match: initialMatchState,
  mentor: initialMentorState,
  activity: initialActivityState,
  user: initialUserState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
