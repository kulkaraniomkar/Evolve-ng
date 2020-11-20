
import { EMenteeActions, MenteeActions } from 'src/app/store/actions/mentee.action';
import { IMenteeState, initialMenteeState } from '../state/mentee.state';


export function menteeReducers(
  state = initialMenteeState,
  action: MenteeActions
): IMenteeState {
  switch (action.type) {
    case EMenteeActions.GET_MENTEE: {
      return {
        ...state,
        loading: true
      };
    }
    case EMenteeActions.GET_MENTEE_SUCCESS: {
      return {
        ...state,
        mentee: action.payload.mentee,
        loading: false
      };
    }
    case EMenteeActions.GET_MENTEE_ERROR: {
      return {
        ...state,
        loading: false
      };
    }
    case EMenteeActions.ADD_MENTEE: {
      return {
        ...state,
        loading: true
      };
    }
    case EMenteeActions.ADD_MENTEE_SUCCESS: {
      return {
        ...state,
        mentee: action.payload.mentee,
        loading: false
      };
    }
    case EMenteeActions.ADD_MENTEE_ERROR: {
      return {
        ...state,
        loading: false
      };
    }
    case EMenteeActions.UPDATE_MENTEE: {
      return {
        ...state,
        loading: true
      };
    }
    case EMenteeActions.UPDATE_MENTEE_SUCCESS: {
      console.log(action.payload.mentee);
      return {
        ...state,
        // mentee: action.payload.mentee,
        loading: false
      };
    }
    case EMenteeActions.UPDATE_MENTEE_ERROR: {
      return {
        ...state,
        loading: false
      };
    }
    case EMenteeActions.GET_MENTEE_SUBSCRIPTION: {
      return {
        ...state,
        loading: true
      };
    }
    case EMenteeActions.GET_MENTEE_SUBSCRIPTION_SUCCESS: {
      console.log(action.payload.menteeSubscription);
      return {
        ...state,
        menteeSubscription: action.payload.menteeSubscription,
        signupStatus: action.payload.signupStatus,
        page: action.payload.page,
        loading: false
      };
    }
    case EMenteeActions.GET_MENTEE_SUBSCRIPTION_ERROR: {
      return {
        ...state,
        loading: false
      };
    }


    default:
      return state;
  }
};
