import { Mentee } from '../../core/model/mentee';
import * as MenteeActions from '../actions';
import { MSubscription } from '../../core/model/m-subscriptions';

export interface MenteeState {
  mentees: MSubscription[];
  mentee: Mentee;
  loading: boolean;
  error: boolean;
}

export const initialState: MenteeState = {
  mentees: [],
  mentee: null,
  loading: false,
  error: false
};

export function reducer(
  state = initialState,
  action: MenteeActions.AllMenteeActions
): MenteeState {

  switch (action.type) {
    case MenteeActions.ADD_MENTEE: {
      return { ...state, loading: true };
    }

    case MenteeActions.ADD_MENTEE_SUCCESS: {
      return {
        ...state,
        loading: false,
       // mentees: [...state.mentees, { ...action.payload }]
      };
    }

    case MenteeActions.ADD_MENTEE_ERROR: {
      return { ...state, loading: false };
    }

    case MenteeActions.GET_MENTEES: {
      return { ...state, loading: true };
    }

    case MenteeActions.GET_MENTEES_ERROR: {
      return {
        ...state,
        loading: false
      };
    }

    case MenteeActions.GET_MENTEES_SUCCESS: {
      return {
        ...state,
        mentees: action.payload,
        loading: false
      };
    }

    case MenteeActions.GET_MENTEE: {
      return { ...state, loading: true };
    }

    case MenteeActions.GET_MENTEE_ERROR: {
      return {
        ...state,
        loading: false
      };
    }

    case MenteeActions.GET_MENTEE_SUCCESS: {
      console.log(action.payload);
      return {
        ...state,
        mentee: action.payload,
        loading: false
      };
    }

    case MenteeActions.DELETE_MENTEE: {
      return {
        ...state,
        loading: true,
      //  mentees: state.mentees.filter(h => h !== action.payload)
      };
    }

    case MenteeActions.DELETE_MENTEE_SUCCESS: {
      const result = { ...state, loading: false };
      return result;
    }

    case MenteeActions.DELETE_MENTEE_ERROR: {
      return {
        ...state,
       // mentees: [...state.mentees, action.payload.requestData],
        loading: false
      };
    }

    case MenteeActions.UPDATE_MENTEE: {
      return {
        ...state,
        mentees: state.mentees.map(h => {
          if (h.MenteeId === action.payload.MenteeId) {
            state.loading = true;
          }
          return h;
        })
      };
    }

    case MenteeActions.UPDATE_MENTEE_SUCCESS: {
      return modifyMenteeState(state, action.payload);
    }

    case MenteeActions.UPDATE_MENTEE_ERROR: {
      return {
        ...state,
        loading: false,
        mentees: state.mentees.map(h => {
          if (h.MenteeId === action.payload.requestData.MenteeId) {
            // Huh? No idea what the error is!
            state.error = true;
          }
          return h;
        })
      };
    }

    case MenteeActions.SET_MENTEE_LOADING: {
      return {
        ...state,
        loading: action.payload == null ? true : action.payload
      };
    }
  }
  return state;
}

function modifyMenteeState(menteeState: MenteeState, menteeChanges: Partial<Mentee>): MenteeState {

  return {
    ...menteeState,
    loading: false,
    mentees: menteeState.mentees.map(h => {
      if (h.MenteeId === menteeChanges.MenteeId) {
        return { ...h, ...menteeChanges };
      } else {
        return h;
      }
    })
  };

}
