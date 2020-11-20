import { IMentor, IMentorExtra, ISuggestedMentor } from '../mentor.interface';
import { ISubscription } from '../subscription.interface';
import { IPage } from '../page.interface';


export interface IMentorHttp extends IMentor {
}
export interface IMentorExtraDetailsService  {
    mentorExtra: IMentorExtra;
    mentor: IMentor
}
export interface IMentorExtraDetailsHttp  {
    MentorInfo: IMentorExtra;
    MentorRegInfo: IMentor
}
export interface IMentorService {
    mentor:  IMentor
}
export interface IMentorSubscriptionService {
    mentorSubscription: ISubscription[];
    signupStatus: boolean;
    page: IPage;
}

export interface IMentorEditService {
    signupStatus: boolean;
}

export interface IMentorEditHttp {
    results : IMentor[];
    errors: any[];
    TotalItems: number;
    PageNumber: number;
    PageSize: number;
    PageCount: number;
    Error?: any;
    Registered: boolean;
}

export interface ISuggestedMentorService {
    suggestedMentors: ISuggestedMentor[];
}
// export interface ISuggestedMentorHttp extends ISuggestedMentor {
// }
// export interface IMentorEditHttp {
//     mentor: IMentor;
//     signupStatus: boolean;
// }


