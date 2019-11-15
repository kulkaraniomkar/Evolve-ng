import { MenteeDisplayData } from '../../core/model/mentee-display-data';
import * as MenteeDisplayDataActions from '../actions';

export interface MenteeDisplayDataState {
  menteeDisplayData: MenteeDisplayData;
  loading: boolean;
  error: boolean;
}

export const initialState: MenteeDisplayDataState = {
  menteeDisplayData: null,
  loading: false,
  error: false
};

export function reducer(
  state = initialState,
  action: MenteeDisplayDataActions.AllMenteeDisplayDataActions
): MenteeDisplayDataState {

  switch (action.type) {
    

    case MenteeDisplayDataActions.GET_MENTEE_DISPLAY_DATA: {
      return { ...state, loading: true };
    }

    case MenteeDisplayDataActions.GET_MENTEE_DISPLAY_DATA_ERROR: {
      return {
        ...state,
        loading: false
      };
    }

    case MenteeDisplayDataActions.GET_MENTEE_DISPLAY_DATA_SUCCESS: {
      return {
        ...state,
        menteeDisplayData: action.payload,
        loading: false
      };
    }


  return state;
  }
}
