import * as MSubscriptionActions from '../actions';
import { MSubscription } from '../../core/model/m-subscriptions';
import { MentorMatch } from '../../core/model/mentor-match';

export interface MSubscriptionState {
  msubscriptions: MSubscription[];
  mentorsmatch: MentorMatch[];
  loading: boolean;
  error: boolean;
}

export const initialState: MSubscriptionState = {
  msubscriptions: [],
  mentorsmatch: null,
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
    case MSubscriptionActions.GET_MENTORS_MATCH: {
      return { ...state, loading: true };
    }

    case MSubscriptionActions.GET_MSUBSCRIPTIONS_ERROR: {
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
      console.log("GET_MS_SUCCESS ", action.payload);
      return {
        ...state,
        msubscriptions: action.payload,
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

    
  }
  return state;
}


