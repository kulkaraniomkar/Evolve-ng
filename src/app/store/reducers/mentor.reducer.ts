import { Mentor } from '../../core/model/mentor';
import * as MentorActions from '../actions';
import { MSubscription } from '../../core/model/m-subscriptions';

export interface MentorState {
  mentors: MSubscription[];
  registered: boolean;
  mentor: Mentor;
  loading: boolean;
  error: boolean;
}

export const initialState: MentorState = {
  mentors: [],
  registered: false,
  mentor: null,
  loading: false,
  error: false
};

export function reducer(
  state = initialState,
  action: MentorActions.AllMentorActions
): MentorState {

  switch (action.type) {
    case MentorActions.ADD_MENTOR: {
      return { ...state, loading: true };
    }

    case MentorActions.ADD_MENTOR_SUCCESS: {
      return {
        ...state,
        loading: false,
        registered: true,
       // mentors: [...state.mentors, { ...action.payload }]
      };
    }

    case MentorActions.ADD_MENTOR_ERROR: {
      return { ...state, loading: false };
    }

    case MentorActions.GET_MENTORS: {
      return { ...state, loading: true, registered: true };
    }

    case MentorActions.GET_MENTORS_ERROR: {
      return {
        ...state,
        loading: false,
        registered: false
      };
    }

    case MentorActions.GET_MENTORS_SUCCESS: {
      return {
        ...state,
        mentors: action.payload['results'],
        loading: false,
        registered:  action.payload['Registered']
      };
    }

    case MentorActions.GET_MENTOR: {
      return { ...state, loading: true };
    }
    case MentorActions.REGISTERED: {
      return { ...state,  registered: true };
    }

    case MentorActions.GET_MENTOR_ERROR: {
      return {
        ...state,
        loading: false
      };
    }

    case MentorActions.GET_MENTOR_SUCCESS: {
      return {
        ...state,
        mentor: action.payload,
        loading: false
      };
    }

    case MentorActions.DELETE_MENTOR: {
      return {
        ...state,
        loading: true,
      //  mentors: state.mentors.filter(h => h !== action.payload)
      };
    }

    case MentorActions.DELETE_MENTOR_SUCCESS: {
      const result = { ...state, loading: false };
      return result;
    }

    case MentorActions.DELETE_MENTOR_ERROR: {
      return {
        ...state,
       // mentors: [...state.mentors, action.payload.requestData],
        loading: false
      };
    }

    case MentorActions.UPDATE_MENTOR: {
      return {
        ...state,
        mentors: state.mentors.map(h => {
          if (h.MentorId === action.payload.MentorId) {
            state.loading = true;
          }
          return h;
        })
      };
    }

    case MentorActions.UPDATE_MENTOR_SUCCESS: {
      return modifyMentorState(state, action.payload);
    }

    case MentorActions.UPDATE_MENTOR_ERROR: {
      return {
        ...state,
        loading: false,
        mentors: state.mentors.map(h => {
          if (h.MentorId === action.payload.requestData.MentorId) {
            // Huh? No idea what the error is!
            state.error = true;
          }
          return h;
        })
      };
    }

    case MentorActions.SET_MENTOR_LOADING: {
      return {
        ...state,
        loading: action.payload == null ? true : action.payload
      };
    }
  }
  return state;
}

function modifyMentorState(mentorState: MentorState, mentorChanges: Partial<Mentor>): MentorState {

  return {
    ...mentorState,
    loading: false,
    mentors: mentorState.mentors.map(h => {
      if (h.MentorId === mentorChanges.MentorId) {
        return { ...h, ...mentorChanges };
      } else {
        return h;
      }
    })
  };

}
