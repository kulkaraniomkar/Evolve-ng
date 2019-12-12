
    export interface UnitOfTime {
        OrderId: string;
        Name: string;
        Text: string;
        Value: string;
    }

    export interface Experience {
        OrderId: number;
        Name: string;
        Text: string;
        Value: string;
        Selected: boolean;
    }

    export interface DomainArea {
        OrderId: number;
        Name: string;
        Text: string;
        Value: string;
        Selected: boolean;
    }

    export interface Mentor {
        //id: number;
        MentorId: number;
        EmployeeId: string;
        ProfessionalBackground?: any;
        Interest?: any;
        Division?: string;
        Passion?: any;
        PriorRoles?: any;
        Available: boolean;
        ReadTerms: boolean;
        UnitOfTimeId: number;
        MentoringCommitment: number;
        Comment?: any;
        YearsOfExperience?: any;
        CurrentRole?: any;
        CreatedDateTime?: any;
        MentorDomianArea: any[];
        MentorExperience: any[];
        UnitOfTimes?: UnitOfTime[];
        Experiences?: Experience[];
        DomainAreas?: DomainArea[];
    }


