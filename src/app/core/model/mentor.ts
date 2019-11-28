
    export interface UnitOfTime {
        OrderId: string;
        Name: string;
        Text: string;
        Value: string;
    }

    export interface Experience {
        OrderId: string;
        Name: string;
        Text: string;
        Value: string;
    }

    export interface DomainArea {
        OrderId: string;
        Name: string;
        Text: string;
        Value: string;
    }

    export interface Mentor {
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


