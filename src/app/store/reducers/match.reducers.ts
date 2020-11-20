import { EMatchActions } from '../actions/match.actions';
import { MatchActions } from '../actions/match.actions';
import { initialMatchState, IMatchState } from '../state/match.state';


export function matchReducers(
  state = initialMatchState,
  action: MatchActions
): IMatchState {
  switch (action.type) {
    case EMatchActions.GET_AUTO_MATCHES: {
      return {
        ...state,
        error: null,
        loading: true
      };
    }
    
    case EMatchActions.GET_AUTO_MATCHES_SUCCESS: {
      return {
        ...state,
        matches: action.payload.matches,
        error: action.payload.error,
        loading: false
      };
    }
    
    case EMatchActions.GET_AUTO_MATCHES_ERROR: {
      console.log(action.payload);
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    }
    case EMatchActions.GET_SAVED_MATCHES: {
      return {
        ...state,
        error: null,
        loading: true
      };
    }
    
    case EMatchActions.GET_SAVED_MATCHES_SUCCESS: {
      return {
        ...state,
        matches: action.payload.matches,
        error: action.payload.error,
        loading: false
      };
    }
    
    case EMatchActions.GET_SAVED_MATCHES_ERROR: {
      console.log(action.payload);
      return {
        ...state,
        matches: null,
        error: action.payload,
        loading: false
      };
    }
    case EMatchActions.DELETE_SAVED_MATCHES: {
      return {
        ...state,
        loading: true
      };
    }
    
    case EMatchActions.DELETE_SAVED_MATCHES_SUCCESS: {
      return {
        ...state,
        matches: null,
        error: null,
        loading: false
      };
    }
    
    case EMatchActions.DELETE_SAVED_MATCHES_ERROR: {
      console.log(action.payload);
      return {
        ...state,
        error: action.payload.error['Message'],
        loading: false
      };
    }
    case EMatchActions.GET_MANUAL_MATCHES: {
      return {
        ...state,
        loading: true
      };
    }
    case EMatchActions.GET_MANUAL_MATCHES_SUCCESS: {
      return {
        ...state,
        manual_matches: action.payload.manualMenteeMatches,
        page: action.payload.page,
        loading: false
      };
    }
    case EMatchActions.GET_MANUAL_MATCHES_ERROR: {
      return {
        ...state,
        loading: false
      };
    }
    case EMatchActions.SEARCH_MANUAL_MATCHES: {
      return {
        ...state,
        loading: true
      };
    }
    case EMatchActions.SEARCH_MANUAL_MATCHES_SUCCESS: {
      return {
        ...state,
        manual_matches: action.payload.manualMenteeMatches,
        page: action.payload.page,
        loading: false
      };
    }
    case EMatchActions.SEARCH_MANUAL_MATCHES_ERROR: {
      return {
        ...state,
        loading: false
      };
    }
    case EMatchActions.SAVE_AUTO_MATCHES: {
      return {
        ...state,
       // error: null,
        loading: true
      };
    }
    case EMatchActions.SAVE_AUTO_MATCHES_SUCCESS: {
      return {
        ...state,
        matches: null,
        saved_matches: action.payload.saved_matches,
        error: null,
        loading: false
      };
    }
    case EMatchActions.SAVE_AUTO_MATCHES_ERROR: {
      console.log(action.payload);
      return {
        ...state,
        error: action.payload.error['Message'],
        loading: false
      };
    }
    case EMatchActions.SAVE_MATCH: {
      return {
        ...state,
        loading: true
      };
    }
    case EMatchActions.SAVE_MATCH_SUCCESS: {
      return {
        ...state,
        matches: null,
        match: action.payload,
        loading: false
      };
    }
    case EMatchActions.SAVE_MATCH_ERROR: {
      console.log(action.payload);
      return {
        ...state,
        loading: false
      };
    }
    case EMatchActions.UPDATE_MENTORSHIP_ACTIVITY: {
      return {
        ...state,
        loading: true
      };
    }
    case EMatchActions.UPDATE_MENTORSHIP_ACTIVITY_ERROR: {
      return {
        ...state,
        loading: false
      };
    }
    case EMatchActions.UPDATE_MENTORSHIP_ACTIVITY_SUCCESS: {
      return {
        ...state,
        loading: false
      };
    }
    
    default:
      return state;
  }
};
