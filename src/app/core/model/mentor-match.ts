import { Mentor } from './mentor';

export class MentorMatch {
    MentorId: number;
    MenteeId: number;
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
export class SavedMatch {
    MenteeId: number;
    Matches: Matches[];
}
export class Matches {
    MentorId: number
}

export interface MentorInfo {
    Id: number;
    BusinessUnit: string;
    Division: string;
    Name: string;
    Age: number;
    Race: string;
    CurrentPosition: string;
    PreviousPosition?: any;
    YearsInRMB: number;
}
export class MentorMatchInfo {
    MentorInfo: MentorInfo;
    MentorRegInfo: Mentor;
}
