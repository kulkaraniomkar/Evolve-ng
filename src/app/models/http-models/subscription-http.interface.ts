import { ISubscription, IAllocatedMentor } from '../subscription.interface';
import { IPage } from '../page.interface';

export interface ISubscriptionService {
    subscriptions: ISubscription[];
    page: IPage;
}
// export interface ISubscriptionService {
//     subscriptions: ISubscription[];
//     pagePending?: IPage;
//     pageUnallocated?: IPage;
//     pageExploratory?: IPage;
// }
export interface ISubscriptionsHttp {
    data: ISubscription[];
    totalItems: number;
    pageNumber: number;
    pageSize: number;
    Registered: boolean;
}
export interface IPendingMenteesService {
    pendingMentees: ISubscription[];
    pagePending: IPage;
}
export interface IUnallocatedMentorsService {
    unallocatedMentors: ISubscription[];
    pageUnallocated: IPage;
}
export interface IExploratoryMentorshipService {
    exploratoryMentorship: ISubscription[];
    pageExploratory: IPage;
}
export interface IAllocatedMentorHttp {
    data: IAllocatedMentor[];
    totalItems: number;
    pageNumber: number;
    pageSize: number;
    Registered: boolean;
}

export interface IAllocatedMentorService {
    allocatedMentors: IAllocatedMentor[];
    pageAllocated: IPage
}




