import { ExpUotDa } from './exp-uot-da.interface';
import { IMatchRegister } from './match-register.interface';
import { IMentorExtra } from './mentor.interface';

export interface IActivity {
    MentorshipActivityId: number;
    MentorId: number;
    MenteeId: number;
    Duration: string;
    MentorInfo: IMentorExtra;
    MenteeInfo: IMentorExtra;
    MatchRegister?: IMatchRegister;
    MentorshipStatus: ExpUotDa[];
    Expriences: ExpUotDa[];
    DomainAreas: ExpUotDa[];
}
export interface IActivityMatch {
    MatchId: number;
    TempMatchId: number;
    MentorId: number;
    PercentageScore: number;
}
