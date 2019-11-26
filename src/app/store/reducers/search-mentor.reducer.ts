import * as SearchMentorActions from '../actions';
import { SearchResults } from '../../core/model/mentor-search';

export interface SearchMentorState {
  searchResults: SearchResults[];
  loading: boolean;
  error: boolean;
}

export const initialState: SearchMentorState = {
  searchResults: [],
  loading: false,
  error: false
};

export function reducer(
  state = initialState,
  action: SearchMentorActions.AllSearchMentorActions
): SearchMentorState {

  switch (action.type) {
    
    case SearchMentorActions.SEARCH_MENTORS: {
      return { ...state, loading: true };
    }

    case SearchMentorActions.SEARCH_MENTORS_ERROR: {
      return {
        ...state,
        loading: false
      };
    }
    case SearchMentorActions.SEARCH_MENTORS_SUCCESS: {
      return {
        ...state,
        searchResults: action.payload,
        loading: false
      };
    }

    case SearchMentorActions.SET_SEARCH_MENTOR_LOADING: {
      return {
        ...state,
        loading: action.payload == null ? true : action.payload
      };
    }
  }
  return state;
}

