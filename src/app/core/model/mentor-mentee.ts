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