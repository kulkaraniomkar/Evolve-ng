import { IManualMatch } from './manual-match.interface';
import { IPage } from './page.interface';

export interface IMatch {
    MentorId: number;
    MenteeId: number;
    MatchTypeId: number;
    PercentageScore: number;
    MaxCount: number;
    CurrentCount: number;
    MentoringAvailability: number;
    TechnicalExperienceProvidable: string[];
    ProfessionalExperienceProvidable: string[];
    Name: string;
    EmployeeId: string;
    Mnemonic: string;
    Email: string;
    Division: string;
    Age: number;
    Gender: number;
    JobTitle: string;
}

export interface IMatches {
    // MatchId: number;
    // TempMatchId: number;
    MentorId: number;
    PercentageScore: number;
}
export interface IMatchesCreate {
    MenteeId: number;
    Matches: IMatches[];
}
export interface IManualMatchesPayload {
    menteeId: number;
    page: IPage;
}
export interface IManualSearchPayload {
    searchParam: string;
    menteeId: number;
    page: IPage;
}

