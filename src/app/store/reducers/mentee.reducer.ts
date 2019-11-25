import { Mentee } from '../../core/model/mentee';
import * as MenteeActions from '../actions';

export interface MenteeState {
  mentees: Mentee[];
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
    

    case MenteeActions.GET_MENTEE: {
      console.log({...state});
      if(state['mentee']){
        console.log({...state['mentee']['mentee']});
      }
      return { ...state, loading: true };
    }

    case MenteeActions.GET_MENTEE_ERROR: {
      return {
        ...state,
        loading: false
      };
    }

    case MenteeActions.GET_MENTEE_SUCCESS: {
      console.log('Mentee values:', {...state} );
      console.log('Action payload values:',  action.payload );
      return {
        ...state,
        mentee: action.payload,
        loading: false
      };
    }


  return state;
  }
}
