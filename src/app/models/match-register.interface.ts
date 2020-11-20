import { IComment } from './comment.interface';

export interface IMatchRegister {
    MentoshipActivityId: number;
    MenteeId: number;
    MentorId: number;
    StartDate: Date;
    EndDate: Date;
    ExplorationMeetingDate: Date;
    StatusId: number;
    MenteeOrientationAttended: boolean;
    MentorOrientationAttended: boolean;
    MenteeOrientationDate: Date;
    MentorOrientationDate: Date;
    MatchTypeId: number;
    FinancialYrId: number;
    CreatedEmployeeId?: any;
    UpdatedEmployeeId?: any;
    CreatedDateTime: Date;
    Comments: IComment[];
}