import { IPage } from './page.interface';

export interface ISubscription {
    MenteeId: number;
    MentorId?: any;
    MentorshipActivityId?: any;
    MentorFullName: string;
    MenteeEmpId?: any;
    MentorEmpId?: any;
    MenteeFullName: string;
    Division: string;
    ShareProfile: boolean;
    FinYear?: any;
    Status?: any;
    Duration: string;
    StartDate?: any;
    EndDate?: any;
    RegisteredDate: Date;
    Registered?: boolean;
}

export interface IAllocatedMentor {
    MentorId: number;
    MenteeId: number;
    ReadTerms: boolean;
    MaxCount: number;
    CountLeft?: number;
    FullName: string;
    Available: boolean;
    MatchTypeId: number;
    expand?: boolean;
    AllocatedMentees: IMentorMentees[];
 }

 export interface IMentorMentees {
    MenteeId: number;
    MentorId: number;
    MentorshipActivityId: number;
    MentorFullName: string;
    MenteeEmpId: string;
    MentorEmpId?: any;
    MenteeFullName: string;
    Division?: any;
    ShareProfile: boolean;
    FinYear: string;
    Status: string;
    Duration: string;
    StartDate: Date;
    EndDate: Date;
    RegisteredDate: Date;
}
export interface IMenteesPerMentorHttp {
    data: IMentorMentees[];
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    Registered: boolean;
}
export interface IMenteesPerMentorService {
    //mentorId: number;
    menteesPerMentor: IMentorMentees[];
    pageNested: IPage;
}


