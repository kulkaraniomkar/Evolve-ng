import { Mentee } from '../../core/model/mentee';
import * as MenteeActions from '../actions';

export interface MenteeState {
  mentees: Mentee[];
  mentee: Mentee;
  totalItems: number;
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  loading: boolean;
  error: boolean;
}

export const initialState: MenteeState = {
  mentees: [],
  mentee: null,
  totalItems: 0,
  pageNumber: 0,
  pageSize: 0,
  pageCount: 0,
  loading: false,
  error: false
};

export function reducer(
  state = initialState,
  action: MenteeActions.AllMenteeActions
): MenteeState {

  switch (action.type) {
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
      console.log("Reducer GET_MENTEES_SUCCESS:", action.payload);
      return {
        ...state,
        mentees: action.payload['results'],
        totalItems: action.payload['TotalItems'],
        pageNumber: action.payload['PageNumber'],
        pageSize: action.payload['PageSize'],
        pageCount:action.payload['PageCount'],
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
      return {
        ...state,
        mentee: action.payload['result'],
        loading: false
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

function modifyCustomerState(menteeState: MenteeState, menteeChanges: Partial<Mentee>): MenteeState {

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
