

    export class MenteeDomianArea {
        MenteeDomainId: number;
        MenteeId: number;
        DomainId: number;
        CreatedDatetime: Date;
        TrackDatetime: Date;
    }

    export class MenteeExperience {
        MenteeExperienceId: number;
        MenteeId: number;
        ExperienceId: number;
        CreatedDateTime: Date;
        TrackDateTime: Date;
    }

    export class Mentee {
        MenteeId: number;
        EmployeeId: string;
        InDivision: boolean;
        Division: string;
        TenantId?: any;
        Interest: string;
        ServicePeriod: number;
        Duration: number;
        UnitOfTimeId: number;
        YearsOfExperience: number;
        PreferredMentorId: number;
        PreferredMentorEmpId?: any;
        PreferredMentorGenderId: number;
        PreferredMentorAgeId: number;
        ShareProfile: boolean;
        ReadTerms: boolean;
        Comment: string;
        CreatedDate: Date;
        MenteeDomianArea: MenteeDomianArea[];
        MenteeExperience: MenteeExperience[];
        UnitOfTimes?: any;
        Experiences?: any;
        DomainAreas?: any;
        Gender?: any;
        AgePreferences?: any;
    }

    export class MenteeList {
        results: Mentee[];
        errors: any[];
        TotalItems: number;
        PageNumber: number;
        PageSize: number;
        PageCount: number;
    }
