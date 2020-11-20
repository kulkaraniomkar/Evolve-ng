import { ESubscriptionActions } from './../actions/subscription.actions';
import { SubscriptionActions } from '../actions/subscription.actions';
import { initialSubscriptionState, ISubscriptionState } from '../state/subscription.state';
import { IMentorMentees } from 'src/app/models/subscription.interface';

export function subscriptionReducers(
  state = initialSubscriptionState,
  action: SubscriptionActions
): ISubscriptionState {
  switch (action.type) {
    case ESubscriptionActions.GET_MENTEE_SEARCH: {
      return {
        ...state,
        loading: true
      };
    }
    case ESubscriptionActions.GET_MENTEE_SEARCH_SUCCESS: {
      return {
        ...state,
        subscriptions: action.payload.subscriptions,
        page: action.payload.page,
        loading: false
      };
    }
    case ESubscriptionActions.GET_MENTEE_SEARCH_ERROR: {
      return {
        ...state,
        loading: false
      };
    }
    case ESubscriptionActions.GET_PENDING_SUBSCRIPTIONS: {
      return {
        ...state,
        loading: true
      };
    }
    case ESubscriptionActions.GET_PENDING_SUBSCRIPTIONS_SUCCESS: {
      return {
        ...state,
        pendingMentees: action.payload.pendingMentees,
        pagePending: action.payload.pagePending,
        loading: false
      };
    }
    case ESubscriptionActions.GET_PENDING_SUBSCRIPTIONS_ERROR: {
      return {
        ...state,
        loading: false
      };
    }
    case ESubscriptionActions.GET_EXPLORATORY_SUBSCRIPTIONS: {
      return {
        ...state,
        loading: true
      };
    }
    case ESubscriptionActions.GET_EXPLORATORY_SUBSCRIPTIONS_SUCCESS: {
      return {
        ...state,
        pageExploratory: action.payload.pageExploratory,
        exploratoryMentorship: action.payload.exploratoryMentorship,
        loading: false
      };
    }
    case ESubscriptionActions.GET_EXPLORATORY_SUBSCRIPTIONS_ERROR: {
      return {
        ...state,
        loading: false
      };
    }
    case ESubscriptionActions.SEARCH_EXPLORATORY_SUBSCRIPTIONS: {
      return {
        ...state,
        loading: true
      };
    }
    case ESubscriptionActions.SEARCH_EXPLORATORY_SUBSCRIPTIONS_SUCCESS: {
      return {
        ...state,
        pageExploratory: action.payload.pageExploratory,
        exploratoryMentorship: action.payload.exploratoryMentorship,
        loading: false
      };
    }
    case ESubscriptionActions.SEARCH_EXPLORATORY_SUBSCRIPTIONS_ERROR: {
      return {
        ...state,
        loading: false
      };
    }
    case ESubscriptionActions.GET_UNALLOCATED_SUBSCRIPTIONS: {
      return {
        ...state,
        loading: true
      };
    }
    case ESubscriptionActions.GET_UNALLOCATED_SUBSCRIPTIONS_SUCCESS: {
      return {
        ...state,
        unallocatedMentors: action.payload.unallocatedMentors,
        pageUnallocated: action.payload.pageUnallocated,
        loading: false
      };
    }
    case ESubscriptionActions.GET_UNALLOCATED_SUBSCRIPTIONS_ERROR: {
      return {
        ...state,
        loading: false
      };
    }
    case ESubscriptionActions.GET_UNALLOCATED_SUBSCRIPTIONS: {
      return {
        ...state,
        loading: true
      };
    }
    case ESubscriptionActions.SEARCH_UNALLOCATED_SUBSCRIPTIONS_SUCCESS: {
      return {
        ...state,
        unallocatedMentors: action.payload.unallocatedMentors,
        pageUnallocated: action.payload.pageUnallocated,
        loading: false
      };
    }
    case ESubscriptionActions.SEARCH_UNALLOCATED_SUBSCRIPTIONS_ERROR: {
      return {
        ...state,
        loading: false
      };
    }
    case ESubscriptionActions.SEARCH_UNALLOCATED_SUBSCRIPTIONS: {
      return {
        ...state,
        loading: true
      };
    }
    case ESubscriptionActions.GET_ALLOCATED_MENTORS_SUBSCRIPTIONS: {
      return {
        ...state,
        loading: true
      };
    }
    case ESubscriptionActions.GET_ALLOCATED_MENTORS_SUCCESS_SUBSCRIPTIONS: {
      return {
        ...state,
        allocatedMentors: action.payload.allocatedMentors,
        pageAllocated: action.payload.pageAllocated,
        pagePerMentor: { pageNumber: 1, pageSize: 5, totalItems: 0 },
        loading: false
      };
    }
    case ESubscriptionActions.GET_ALLOCATED_MENTORS_ERROR_SUBSCRIPTIONS: {
      return {
        ...state,
        loading: false
      };
    }
    case ESubscriptionActions.SEARCH_ALLOCATED_SUBSCRIPTIONS: {
      return {
        ...state,
        loading: true
      };
    }
    case ESubscriptionActions.SEARCH_ALLOCATED_SUBSCRIPTIONS_SUCCESS: {
      return {
        ...state,
        allocatedMentors: action.payload.allocatedMentors,
        pageAllocated: action.payload.pageAllocated,
        pagePerMentor: { pageNumber: 1, pageSize: 5, totalItems: 0 },
        loading: false
      };
    }
    case ESubscriptionActions.SEARCH_ALLOCATED_SUBSCRIPTIONS_ERROR: {
      return {
        ...state,
        loading: false
      };
    }
    case ESubscriptionActions.GET_MENTEES_PER_MENTOR: {
      return {
        ...state,
        loadingMenteesPerMentor: true
      };
    }
    case ESubscriptionActions.GET_MENTEES_PER_MENTOR_SUCCESS: {
      //return modifyAllocatedMentorState(state, action.payload.mentees_per_mentor, action.payload.mentorId)
    return {
      ...state,
      menteesPerMentor: action.payload.menteesPerMentor,
      pagePerMentor: action.payload.pageNested,
      loadingMenteesPerMentor: false
    }
    }
    case ESubscriptionActions.GET_MENTEES_PER_MENTOR_ERROR: {
      return {
        ...state,
        loadingMenteesPerMentor: false
      };
    }

    case ESubscriptionActions.SET_ALLOCATED_MENTORS_EXPAND: {
      return modifyAllocatedMentorExpandState(state, action.payload.expand, action.payload.mentorId)
    }
    default:
        return state;
    }
  };
  
  function modifyAllocatedMentorState(allocatedMentorsState: ISubscriptionState, allocatedMentorsChanges: Partial<IMentorMentees[]>, mentorId: number): ISubscriptionState {

    return {
      ...allocatedMentorsState,
      loading: false,
      allocatedMentors: allocatedMentorsState.allocatedMentors.map(h => {
        if (h.MentorId === mentorId) {
          return { ...h, expand: true, allocatedMentees:allocatedMentorsChanges };
        } else {
          return h;
        }
      })
    };
  
  }
  function modifyAllocatedMentorExpandState(allocatedMentorsState: ISubscriptionState, allocatedMentorsExpandChanges: boolean, mentorId: number): ISubscriptionState {

    return {
      ...allocatedMentorsState,
      loadingMenteesPerMentor: false,
      allocatedMentors: allocatedMentorsState.allocatedMentors.map(h => {
        if (h.MentorId === mentorId) {
          return { ...h, expand: allocatedMentorsExpandChanges };
        } else {
          return { ...h, expand: false };
        }
      })
    };
  
  }