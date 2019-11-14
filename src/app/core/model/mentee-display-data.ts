declare module namespace {

    export interface UnitOfTime {
        Name: string;
        Text: string;
        Value: string;
    }

    export interface Experience {
        Name: string;
        Text: string;
        Value: string;
    }

    export interface DomainArea {
        Name: string;
        Text: string;
        Value: string;
    }

    export interface Gender {
        Name: string;
        Text: string;
        Value: string;
    }

    export interface AgePreference {
        Name: string;
        Text: string;
        Value: string;
    }

    export interface Result {
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

    export interface RootObject {
        results: Result[];
        errors: any[];
        TotalItems: number;
        PageNumber: number;
        PageSize: number;
        PageCount: number;
    }

}

