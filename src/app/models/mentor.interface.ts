import { ExpUotDa } from './exp-uot-da.interface';

export interface IMentor {
    MentorId: number;
    EmployeeId: string;
    ProfessionalBackground: string;
    Interest: string;
    Division: string;
    Passion: string;
    PriorRoles: string;
    Available: boolean;
    ReadTerms: boolean;
    UnitOfTimeId: number;
    MentoringCommitment: number;
    Comment: string;
    YearsOfExperience: number;
    CurrentRole: string;
    ShareProfile: boolean;
    MenteeMaxCount: number;
    CreatedDateTime: Date;
    CreatedEmployeeId?: any;
    MentorDomianArea: MentorDomianArea[];
    MentorExperience: MentorExperience[];
    UnitOfTimes: ExpUotDa[];
    Experiences: ExpUotDa[];
    DomainAreas: ExpUotDa[];
}

export interface IMentorExtra {
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
export interface IMentorEdit {
    MentorId: number;
    EmployeeId: string;
    ProfessionalBackground: string;
    Interest: string;
    Division: string;
    Passion: string;
    PriorRoles: string;
    Available: boolean;
    ReadTerms: boolean;
    UnitOfTimeId: number;
    MentoringCommitment: number;
    Comment: string;
    ShareProfile: boolean;
    MenteeMaxCount: number;
    MentorDomianArea: MentorDomianAreaEdit[];
    MentorExperience: MentorExperienceEdit[];
    
}
export interface MentorDomianAreaEdit {
    DomainId: any; // changed to any. its must be a number but it comes as string
}
export interface MentorExperienceEdit {
    ExperienceId: any;
}
export interface MentorDomianArea {
    MenteeDomainId: number;
    MenteeId: number;
    DomainId: number;
}

export interface MentorExperience {
    MenteeExperienceId: number;
    MenteeId: number;
    ExperienceId: number;
    DisplayName?: any;
}

    // export interface IMentor {
    //     MentorInfo: IMentor;
    //     MentorRegInfo: IMentorReg;
    // }

export interface IMentorInfo  {
        Id: number;
        BusinessUnit: string;
        Division: string;
        Name: string;
        Age:number;
        Race: string;
        CurrentPosition: string;
        PreviousPosition:string;
        YearsInRMB: number;
 }
 export interface ISuggestedMentor {
     EmployeeId: string;
     FullName: string;
 } 
 export interface ISuggestedMentorParams {
    SearchId: number;
    SearchString: string;
    Limit: number;
    bu: string;
 }
 
 

