
import { EUserActions, UserActions } from '../actions/user.actions';
import { IUserState, initialUserState } from '../state/user.state';


export function userReducers(
  state = initialUserState,
  action: UserActions
): IUserState {
  switch (action.type) {
    case EUserActions.GET_USER: {
      return {
        ...state,
        loading: true
      };
    }
    case EUserActions.GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
        loading: false
      };
    }
    case EUserActions.GET_USER_ERROR: {
      return {
        ...state,
        loading: false
      };
    }

    default:
      return state;
  }
};
