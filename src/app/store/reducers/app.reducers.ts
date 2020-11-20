import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { settingReducers } from './setting.reducers';
import { IAppState } from '../state/app.state';
import { subscriptionReducers } from './subscription.reducers';
import { menteeReducers } from './mentee.reducers';
import { matchReducers } from './match.reducers';
import { mentorReducers } from './mentor.reducers';
import { activityReducers } from './activity.reducers';
import { userReducers } from './user.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  setting: settingReducers,
  subscription: subscriptionReducers,
  mentee: menteeReducers,
  match: matchReducers,
  mentor: mentorReducers,
  activity: activityReducers,
  user: userReducers
};
