
import { EMentorActions, MentorActions } from 'src/app/store/actions/mentor.action';
import { IMentorState, initialMentorState } from '../state/mentor.state';
import { act } from '@ngrx/effects';


export function mentorReducers(
  state = initialMentorState,
  action: MentorActions
): IMentorState {
  switch (action.type) {
    case EMentorActions.SUGGEST_MENTOR: {
      return {
        ...state,
        loadingSearch: true
      };
    }
    case EMentorActions.SUGGEST_MENTOR_SUCCESS: {
      console.log(action.payload);
      return {
        ...state,
        mentorSearch: action.payload.suggestedMentors,
        loadingSearch: false
      };
    }
    case EMentorActions.SUGGEST_MENTOR_ERROR: {
      return {
        ...state,
        loadingSearch: false
      };
    }
    case EMentorActions.GET_MENTOR: {
      return {
        ...state,
        loading: true
      };
    }
    case EMentorActions.GET_MENTOR_SUCCESS: {
      console.log(action.payload.mentor);
      return {
        ...state,
        mentor: action.payload.mentor,
        loading: false
      };
    }
    case EMentorActions.GET_MENTOR_ERROR: {
      return {
        ...state,
        loading: false
      };
    }
    case EMentorActions.GET_MENTOR_EXTRA_DETAILS: {
      return {
        ...state,
        loading: true
      };
    }
    case EMentorActions.GET_MENTOR_EXTRA_DETAILS_SUCCESS: {
      console.log(action.payload);
      return {
        ...state,
        mentor: action.payload.mentor,
        mentorExtra: action.payload.mentorExtra,
        loading: false
      };
    }
    case EMentorActions.GET_MENTOR_EXTRA_DETAILS_ERROR: {
      return {
        ...state,
        loading: false
      };
    }
    case EMentorActions.GET_MENTOR_SUBSCRIPTION: {
      return {
        ...state,
        loading: true
      };
    }
    case EMentorActions.GET_MENTOR_SUBSCRIPTION_SUCCESS: {
      console.log(action.payload.mentorSubscription);
      return {
        ...state,
        mentorSubscription: action.payload.mentorSubscription,
        signupStatus: action.payload.signupStatus,
        loading: false
      };
    }
    case EMentorActions.GET_MENTOR_SUBSCRIPTION_ERROR: {
      return {
        ...state,
        loading: false
      };
    }
    case EMentorActions.CREATE_MENTOR: {
      return {
        ...state,
        loading: true
      };
    }
    case EMentorActions.CREATE_MENTOR_SUCCESS: {
      return {
        ...state,
        signupStatus: action.payload.signupStatus,
        loading: false
      };
    }
    case EMentorActions.CREATE_MENTOR_ERROR: {
      return {
        ...state,
        loading: false
      };
    }
    case EMentorActions.UPDATE_MENTOR: {
      return {
        ...state,
        loading: true
      };
    }
    case EMentorActions.UPDATE_MENTOR_SUCCESS: {
      return {
        ...state,
        signupStatus: action.payload.signupStatus,
        loading: false
      };
    }
    case EMentorActions.UPDATE_MENTOR_ERROR: {
      return {
        ...state,
        loading: false
      };
    }


    default:
      return state;
  }
};
