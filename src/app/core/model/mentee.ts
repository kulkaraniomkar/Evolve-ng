export class Mentee {
  id: number;
  name:string;
  lastname: string;
  email:string;
  autoMatch:boolean;
  manualMatch: boolean;
  savedResult: boolean;
  interest: string;
  division: string;
  mentoringPeriod: string;
  divisionPreference: boolean;
  gender:string;
  mentorAge: string;
  achievement: AchivementItem;
  experience: ExperienceItem;
  comment: string;
  shareProfile: boolean;
  readTerms:boolean;
}

export class AchivementItem {
  learnSystem: boolean;
  careerGuidance: boolean;
  teamUnit: boolean;
  impactTeam: boolean;
  relationship: boolean;
  careerTransaction: boolean;
  leadershipSkills: boolean;
  diversity: boolean;
  broadenKnowledge: boolean;
}
export class ExperienceItem {
  businessTechnology: boolean;
  clientService: boolean;
  credit: boolean;
  finance: boolean;
  humanCapital: boolean;
  legalCompliance: boolean;
  marketingCommunication: boolean;
  operation: boolean;
  support: boolean;
}

