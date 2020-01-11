import * as MSubscriptionActions from '../actions';
import { MSubscription } from '../../core/model/m-subscriptions';
import { MentorMatch, SavedMatch, MentorMatchInfo } from '../../core/model/mentor-match';
import { MentorMentee, ManualMatch, Comments } from '../../core/model/mentor-mentee';

export interface MSubscriptionState {
  msubscriptions: MSubscription[];
  mentorsmatch: MentorMatch[];
  extractedsavedmatch: MentorMatch[];
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
  extractedsavedmatch: [],
  savedmatches: [],
  savedmatch: null,
  mentormentee: null,
  // mentormentee: {MentorshipActivityId:0, MentorId:0, MenteeId:0, Duration: null,
  //    MenteeInfo:null, MentorInfo: null, MatchRegister:},
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
      return { ...state, msubscriptions: [], loading: true };
    }
    case MSubscriptionActions.NAVIGATE_TO_SEARCH: {
      return { ...state, msubscriptions: [], loading: false };
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
        extractedsavedmatch: action.payload,
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
        mentorsmatch: [],
        extractedsavedmatch: [],
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
    /** extract saved mentors */
    case MSubscriptionActions.EXTRACT_SAVED_MENTORS_MATCH: {
      return { ...state, loading: true };
    }
    case MSubscriptionActions.EXTRACT_SAVED_MENTORS_MATCH_SUCCESS: {
      return {
        ...state,
        mentorsmatch: action.payload,
        extractedsavedmatch: action.payload,
        loading: false
      };
    }
    case MSubscriptionActions.EXTRACT_SAVED_MENTORS_MATCH_ERROR: {
      return { ...state, loading: false };
    }
    /** end extract */
    /** delete results  */
    case MSubscriptionActions.REMOVE_MENTORS_MATCH: {
      return {
        ...state,
        loading: true
      };
    }
    case MSubscriptionActions.REMOVE_MENTORS_MATCH_ERROR: {
      return {
        ...state,
        loading: false
      };
    }
    case MSubscriptionActions.REMOVE_MENTORS_MATCH_SUCCESS: {
      return {
        ...state,
        mentorsmatch: [],
        extractedsavedmatch: [],
        loading: false
      };
    }
    /** end */
    /** delete comment  */
    case MSubscriptionActions.REMOVE_COMMENT: {
      console.log(action.payload);
      const tempComm: Comments[] = state.mentormentee['MatchRegister']['Comments'];
      const comments = tempComm.map(h => {
        console.log(h);
        if (h['CommentId'] === action.payload['CommentId']) {
          return { ...h, IsActive: false }
        }
        return { ...h}
      });
      console.log('comments ', comments);
      const commentsInit = {
        ...state.mentormentee,
        MatchRegister: {
          ...state.mentormentee['MatchRegister'],
          Comments: comments
        },
      }
      const commentsInit2 = {
        ...state,
        mentormentee: {
          ...state.mentormentee,
          MatchRegister: {
            ...state.mentormentee['MatchRegister'],
            Comments: comments
          },
        },
      }
      console.log(commentsInit);
      return {
        ...state,
        mentormentee: {
          ...state.mentormentee,
          MatchRegister: {
            ...state.mentormentee['MatchRegister'],
            Comments: comments
          },
        },
        loading: true,
       
      };
    }
    case MSubscriptionActions.REMOVE_COMMENT_ERROR: {
      const tempComm: Comments[] = state.mentormentee['MatchRegister']['Comments'];
      const comments = tempComm.map(h => {
        if (h['CommentId'] === action.payload['requestData']['CommentId']) {
          return { ...h, IsActive: true }
        }
        return { ...h }
      });
      const commInit = { ...state.mentormentee, ...state.mentormentee['MatchRegister'], Comments: comments };

      return {
        ...state,
        loading: false,
        mentormentee: commInit
      };
    }
    case MSubscriptionActions.REMOVE_COMMENT_SUCCESS: {
      //return modifyMSubscriptionState(state, action.payload);
      return {
        ...state,
        loading: false
      };
    }
    /** end */



  }
  return state;
}
function modifyMSubscriptionState(msubscriptionState: MSubscriptionState, commentsChanges: Partial<Comments>): MSubscriptionState {
  return {
    ...msubscriptionState,
    loading: false,
    // mentormentee: 
  }
}


