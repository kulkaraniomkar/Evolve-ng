import * as MSubscriptionActions from '../actions';
import { MSubscription } from '../../core/model/m-subscriptions';
import { MentorMatch, SavedMatch, MentorMatchInfo } from '../../core/model/mentor-match';
import { MentorMentee, ManualMatch } from '../../core/model/mentor-mentee';

export interface MSubscriptionState {
  msubscriptions: MSubscription[];
  mentorsmatch: MentorMatch[];
  savedmatches: SavedMatch[];
  savedmatch: SavedMatch;
  mentormentee: MentorMentee;
  mentormenteeinfo: MentorMatchInfo;
  manualmatch: ManualMatch[];
  loading: boolean;
  error: boolean;
}

export const initialState: MSubscriptionState = {
  msubscriptions: [],
  mentorsmatch: null,
  savedmatches: [],
  savedmatch: null,
  mentormentee: null,
  mentormenteeinfo: null,
  manualmatch: [],
  loading: false,
  error: false
};

export function reducer(
  state = initialState,
  action: MSubscriptionActions.AllMSubscriptionActions
): MSubscriptionState {

  switch (action.type) {

    case MSubscriptionActions.GET_MSUBSCRIPTIONS: {
      return { ...state, loading: true };
    }
    case MSubscriptionActions.GET_SEARCH_MSUBSCRIPTIONS: {
      return { ...state,  msubscriptions:[], loading: true };
    }
    case MSubscriptionActions.NAVIGATE_TO_SEARCH: {
      return { ...state,  msubscriptions:[], loading: false };
    }
    case MSubscriptionActions.GET_MANUAL_MENTORS: {
      return { ...state, loading: true };
    }
    case MSubscriptionActions.GET_MENTORS_MATCH: {
      return { ...state, loading: true };
    }

    
    case MSubscriptionActions.GET_MANUAL_MENTORS_ERROR: {
      return {
        ...state,
        loading: false
      };
    }
    case MSubscriptionActions.GET_MENTORS_MATCH_ERROR: {
      return {
        ...state,
        loading: false
      };
    }

    case MSubscriptionActions.GET_MSUBSCRIPTIONS_SUCCESS: {
      return {
        ...state,
        msubscriptions: action.payload,
        loading: false
      };
    }
    case MSubscriptionActions.GET_SEARCH_MSUBSCRIPTIONS_SUCCESS: {
      return {
        ...state,
        msubscriptions: action.payload,
        loading: false
      };
    }
    case MSubscriptionActions.GET_MANUAL_MENTORS_SUCCESS: {
      return {
        ...state,
        manualmatch: action.payload,
        loading: false
      };
    }
    case MSubscriptionActions.GET_MENTORS_MATCH_SUCCESS: {
      return {
        ...state,
        mentorsmatch: action.payload,
        loading: false
      };
    }
    case MSubscriptionActions.SAVE_MENTORS_MATCH: {
      return { ...state, loading: true };
    }

    case MSubscriptionActions.SAVE_MENTORS_MATCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        savedmatches: [...state.savedmatches, { ...action.payload }]
      };
    }
   
    case MSubscriptionActions.SAVE_MENTORS_MATCH_ERROR: {
      return { ...state, loading: false };
    }
    case MSubscriptionActions.GET_SEARCH_MSUBSCRIPTIONS_ERROR: {
      return { ...state, loading: false };
    }
    case MSubscriptionActions.GET_MENTOR_INFO: {
      return { ...state, loading: true };
    }
    case MSubscriptionActions.GET_MENTOR_INFO_SUCCESS: {
      return {
        ...state,
        mentormenteeinfo: action.payload,
        loading: false
      };
    }   

    case MSubscriptionActions.GET_MENTOR_INFO_ERROR: {
      return { ...state, loading: false };
    }
    case MSubscriptionActions.GET_MENTOR_MENTEE: {
      return { ...state, loading: true };
    }
    case MSubscriptionActions.GET_MENTOR_MENTEE_SUCCESS: {
      return {
        ...state,
        mentormentee: action.payload,
        loading: false
      };
    }   

    case MSubscriptionActions.GET_MENTOR_MENTEE_ERROR: {
      return { ...state, loading: false };
    }


    
  }
  return state;
}


