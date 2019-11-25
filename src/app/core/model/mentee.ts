export class MenteeDomianArea {
  MenteeDomainId: number;
  MenteeId: number;
  DomainId: number;
  CreatedDatetime: Date;
  TrackDatetime: Date;
}
export interface AgePreference {
  OrderId: string;
  Name: string;
  Text: string;
  Value: string;
}
export class DomainArea {
  OrderId: string;
  Name: string;
  Text: string;
  Value: string;
}
export class Gender {
  OrderId: string;
  Name: string;
  Text: string;
  Value: string;
}

export class SearchParam {
  OrderId: string;
  Name: string;
  Text: string;
  Value: string;
}
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
  AgePreference: AgePreference[];
  SearchParams: SearchParam[];
  Gender: Gender[];
}

export class MenteeList {
  results: Mentee[];
  errors: any[];
  TotalItems: number;
  PageNumber: number;
  PageSize: number;
  PageCount: number;
}
