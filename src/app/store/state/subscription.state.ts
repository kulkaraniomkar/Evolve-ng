import { ISubscription, IAllocatedMentor, IMentorMentees } from 'src/app/models/subscription.interface';
import { IPage } from 'src/app/models/page.interface';

export interface ISubscriptionState {
  subscriptions: ISubscription[];
  pendingMentees:ISubscription[];
  unallocatedMentors: ISubscription[];
  exploratoryMentorship: ISubscription[];
  allocatedMentors: IAllocatedMentor[];
  //menteesPerMentor: [{ mentorId: number, menteesNested: IMentorMentees[]}];
  menteesPerMentor: IMentorMentees[];
  page: IPage;
  pagePerMentor: IPage;
  pagePending: IPage;
  pageAllocated: IPage;
  pageExploratory: IPage;
  pageUnallocated: IPage;
  loading: boolean;
  loadingMenteesPerMentor: boolean;
  selectedSubscription: ISubscription;
}

export const initialSubscriptionState: ISubscriptionState = {
  subscriptions: null,
  pendingMentees: null,
  unallocatedMentors: null,
  exploratoryMentorship: null,
  allocatedMentors: null,
 // allocatedMentors:  [{MentorId: 0,  MenteeId: 0, ReadTerms: false, MaxCount: 3, CountLeft: 3, FullName: '', Available: true, MatchTypeId: 1, AllocatedMentees : []}],
  menteesPerMentor: null,
  page: { pageNumber: 1, pageSize: 5, totalItems: 0 },
  pagePerMentor: { pageNumber: 1, pageSize: 5, totalItems: 0 },
  pagePending: { pageNumber: 1, pageSize: 5, totalItems: 0 },
  pageAllocated: { pageNumber: 1, pageSize: 5, totalItems: 0 },
  pageExploratory: { pageNumber: 1, pageSize: 5, totalItems: 0 },
  pageUnallocated: { pageNumber: 1, pageSize: 5, totalItems: 0 },
  loadingMenteesPerMentor: false,
  loading: false,
  selectedSubscription: null
};
