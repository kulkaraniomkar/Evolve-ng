export class UnitOfTime {
        Name: string;
        Text: string;
        Value: string;
    }

    export class Experience {
        Name: string;
        Text: string;
        Value: string;
    }

    export class DomainArea {
        Name: string;
        Text: string;
        Value: string;
    }

    export class Gender {
        Name: string;
        Text: string;
        Value: string;
    }

    export class AgePreference {
        Name: string;
        Text: string;
        Value: string;
    }

    export class Result {
        MenteeId: number;
        EmployeeId: string;
        InDivision: boolean;
        Division: string;
        TenantId?: any;
        Interest?: any;
        ServicePeriod?: any;
        Duration?: any;
        UnitOfTimeId: number;
        YearsOfExperience: number;
        PreferredMentorId?: any;
        PreferredMentorEmpId?: any;
        PreferredMentorGenderId?: any;
        PreferredMentorAgeId?: any;
        ShareProfile: boolean;
        ReadTerms: boolean;
        Comment?: any;
        CreatedDate: Date;
        MenteeDomianArea: any[];
        MenteeExperience: any[];
        UnitOfTimes: UnitOfTime[];
        Experiences: Experience[];
        DomainAreas: DomainArea[];
        Gender: Gender[];
        AgePreferences: AgePreference[];
    }

    export class MenteeDisplayData {
        results: Result[];
        errors: any[];
        TotalItems: number;
        PageNumber: number;
        PageSize: number;
        PageCount: number;
    }

