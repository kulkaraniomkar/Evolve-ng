import { ExpUotDa } from './exp-uot-da.interface';

    export interface MenteeDomianArea {
        MenteeDomainId?: number;
        MenteeId?: number;
        DomainId: number;
    }

    export interface MenteeExperience {
        MenteeExperienceId: number;
        MenteeId: number;
        ExperienceId: number;
        DisplayName?: any;
    }


    export interface PreferredMentor {
        EmployeeId: string;
        FullName: string;
    }

    export interface IMentee {
        MenteeId: number;
        EmployeeId: string;
        InDivision: number;
        Division: string;
        bu?: string;
        Interest: string;
        ServicePeriod: number;
        Duration: number;
        UnitOfTimeId: number;
        YearsOfExperience: number;
        PreferredMentorEmpId: string;
        PreferredMentorGenderId: number;
        PreferredMentorAgeId: number;
        ShareProfile: boolean;
        ReadTerms: boolean;
        StatusId?: any;
        Comment: string;
        CreatedDate: Date;
        CreatedEmployeeId?: any;
        MenteeDomianArea: MenteeDomianArea[];
        MenteeExperience: MenteeExperience[];
        UnitOfTimes?: ExpUotDa[];
        Experiences?: ExpUotDa[];
        DomainAreas?: ExpUotDa[];
        AgePreference?: ExpUotDa[];
        SearchParams?: ExpUotDa[];
        Gender?: ExpUotDa[];
        PreferredMentor: PreferredMentor;
    }


