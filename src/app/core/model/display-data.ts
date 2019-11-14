export class DisplayData {
    results: Result[];
    errors: any[];
    TotalItems: number;
    PageNumber: number;
    PageSize: number;
    PageCount: number;
}

export class Result {
    MentorId: number;
    EmployeeId: string;
    ProfessionalBackground?: any;
    Interest?: any;
    Division: string;
    Passion?: any;
    PriorRoles?: any;
    Available: boolean;
    ReadTerms: boolean;
    UnitOfTime: number;
    MentoringCommitment: number;
    Comment?: any;
    YearsOfExperience?: any;
    CurrentRole?: any;
    CreatedDateTime?: any;
    MentorDomianArea: any[];
    MentorExperience: any[];
    UnitOfTimes: UnitOfTime[];
    Experiences: Experience[];
    DomainAreas: DomainArea[];
}
  
export class UnitOfTime {
    Text: string;
    Value: string;
}

export class Experience {
    Text: string;
    Value: string;
}

export class DomainArea {
    Text: string;
    Value: string;
}

