
import { EActivityActions, ActivityActions } from '../actions/activity.actions';
import { IActivityState, initialActivityState } from '../state/activity.state';


export function activityReducers(
  state = initialActivityState,
  action: ActivityActions
): IActivityState {
  switch (action.type) {
    case EActivityActions.GET_ACTIVITY: {
      return {
        ...state,
        loading: true
      };
    }
    case EActivityActions.GET_ACTIVITY_SUCCESS: {
      return {
        ...state,
        activity: action.payload.activity,
        matchType: action.payload.matchType,
        loading: false
      };
    }
    case EActivityActions.GET_ACTIVITY_ERROR: {
      return {
        ...state,
        loading: false
      };
    }
    
    default:
      return state;
  }
};
