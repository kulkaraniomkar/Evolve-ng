export class MenteeDomianArea {
  MenteeDomainId: number;
  MenteeId: number;
  DomainId: number;
  CreatedDatetime: Date;
  TrackDatetime: Date;
}
export interface AgePreference {
  OrderId: number;
  Name: string;
  Text: string;
  Value: number;
}
export class DomainArea {
  OrderId: number;
  Name: string;
  Text: string;
  Value: string;
  Selected: boolean;
}
export class Gender {
  OrderId: number;
  Name: string;
  Text: string;
  Value: number;
}

export class SearchParam {
  OrderId: number;
  Name: string;
  Text: string;
  Value: number;
}
export interface UnitOfTime {
  OrderId: number;
  Name: string;
  Text: string;
  Value: number;
}

export interface Experience {
  OrderId: number;
  Name: string;
  Text: string;
  Value: number;
  Selected: boolean;
}
export class MenteeExperience {
  MenteeExperienceId: number;
  MenteeId: number;
  ExperienceId: number;
  CreatedDateTime: Date;
  TrackDateTime: Date;
}

export class Mentee {
  // id: number;
  MenteeId: number;
  EmployeeId: number;
  InDivision: boolean;
  Division: string;
  BU?: string;
  //TenantId?: any;
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
  UnitOfTimes?: UnitOfTime[];
  Experiences?: Experience[];
  DomainAreas?: DomainArea[];
  AgePreference?: AgePreference[];
  SearchParams?: SearchParam[];
  Gender?: Gender[];
}

export class MenteeList {
  results: Mentee[];
  errors: any[];
  TotalItems: number;
  PageNumber: number;
  PageSize: number;
  PageCount: number;
}