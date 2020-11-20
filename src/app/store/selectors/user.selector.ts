import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IUserState } from '../state/user.state';

const selectUser = (state: IAppState) => state.user;

export const selectUserState = createSelector(
  selectUser,
  (state: IUserState) => state.user
);


export const selectLoadingUser = createSelector(
  selectUser,
  (state: IUserState) => state.loading
);
