export class MentorMentee {
    MentorshipActivityId: number;
    MentorId: number;
    MenteeId: number;
    Duration: string;
    MentorInfo: MentorInfo;
    MenteeInfo: MenteeInfo;
    MatchRegister?: any;
    MentorshipStatus: MentorshipStatus[];
    Expriences: Exprience[];
    DomainAreas: DomainArea[];
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

export interface MenteeInfo {
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

export interface MentorshipStatus {
    OrderId: string;
    Name: string;
    Text: string;
    Value: string;
    Selected: boolean;
}

export interface Exprience {
    OrderId: string;
    Name: string;
    Text: string;
    Value: string;
    Selected: boolean;
}

export interface DomainArea {
    OrderId: string;
    Name: string;
    Text: string;
    Value: string;
    Selected: boolean;
}

export class MentorMenteeIds {
    mentorId: number;
    menteeId: number;
}
export class MatchCreate{
    MenteeId: number;
    MentorId: number;
    StartDate: Date;
    EndDate: Date;
    StatusId: number;
    MatchTypeId: number;
    FinancialYrId: number;
    Comments: Comments[]
}
export class Comments {
    Comment: string;
}

export class ManualMatch {
    MentorId: number;
    MenteeId: number;
    MatchTypeId: number;
    PercentageScore: number;
    MentoringAvailability: number;
    TechnicalExperienceProvidable?: any;
    ProfessionalExperienceProvidable?: any;
    Name: string;
    EmployeeId: string;
    Mnemonic: string;
    Email: string;
    Division: string;
    Age: number;
    Gender: number;
    JobTitle: string;
}