import { Injectable } from '@angular/core';

import { RequestInfo, InMemoryDbService } from 'angular-in-memory-web-api';
import { Mentee } from './model/mentee';
import { Mentor } from './model/mentor';
import { MSubscription } from './model/m-subscriptions';

/** In-memory database data */
interface Db {
  [collectionName: string]: any[];
}

@Injectable()
export class InMemoryDataService implements InMemoryDbService {

  /** True if in-mem service is intercepting; all requests pass thru when false. */
  active = true;
  maxId = 0;

  /** Create the in-memory database. Sample data is found below. */
  createDb(reqInfo?: RequestInfo) {
    return { mentees, mentors, msubscription };
  }

  /**
   * Simulate generating new Id on the server
   * All collections in this db have numeric ids.
   * Seed grows by highest id seen in any of the collections.
   */
  genId(collection: { id: number }[], collectionName: string) {
    this.maxId =
      1 +
      collection.reduce((prev, cur) => Math.max(prev, cur.id || 0), this.maxId);
    return this.maxId;
  }

}

const mentees: Mentee[] = [
  {
   // id: 0,
    MenteeId: 0,
    EmployeeId: 5320712,
    InDivision: false,
    Division: "RMB",
    //TenantId: null,
    Interest: null,
    ServicePeriod: null,
    Duration: "6 months",
    UnitOfTimeId: 0,
    YearsOfExperience: 0,
    //PreferredMentorId: null,
    PreferredMentorEmpId: null,
    PreferredMentorGenderId: null,
    PreferredMentorAgeId: null,
    ShareProfile: false,
    ReadTerms: false,
    Comment: null,
    CreatedDate: new Date(),
    MenteeDomianArea: [],
    MenteeExperience: [],
    UnitOfTimes: [
      {
        OrderId: 1,
        Name: "month",
        Text: "Month(s)",
        Value: 1
      },
      {
        OrderId: 2,
        Name: "year",
        Text: "Year(s)",
        Value: 2
      }
    ],
    Experiences: [
      {
        OrderId: 10,
        Name: "supportService",
        Text: "Support Services",
        Value: 10
      },
      {
        OrderId: 11,
        Name: "transacting",
        Text: "Transacting",
        Value: 11
      },
      {
        OrderId: 12,
        Name: "trading",
        Text: "Trading",
        Value: 12
      },
      {
        OrderId: 13,
        Name: "nonSpecific",
        Text: "No specific preference",
        Value: 13
      },
      {
        OrderId: 2,
        Name: "businessTechnology",
        Text: "Business Technology",
        Value: 2
      },
      {
        OrderId: 3,
        Name: "clientService",
        Text: "Client Services",
        Value: 3
      },
      {
        OrderId: 4,
        Name: "credit",
        Text: "Credit",
        Value: 4
      },
      {
        OrderId: 5,
        Name: "finance",
        Text: "Finance",
        Value: 5
      },
      {
        OrderId: 6,
        Name: "humanCapital",
        Text: "Human Capital",
        Value: 6
      },
      {
        OrderId: 7,
        Name: "legalRiskCompliance",
        Text: "Legal, Risk and Compliance",
        Value: 7
      },
      {
        OrderId: 8,
        Name: "marketingCommunication",
        Text: "Marketing and Communication",
        Value: 8
      },
      {
        OrderId: 9,
        Name: "operationProcess",
        Text: "Operations/Processes/Admin",
        Value: 9
      }
    ],
    DomainAreas: [
      {
        OrderId: 11,
        Name: "learnToNavigate",
        Text: "Learn how to ‘navigate’ the system",
        Value: "11"
      },
      {
        OrderId: 12,
        Name: "careerGuidance",
        Text: "Career guidance",
        Value: "12"
      },
      {
        OrderId: 13,
        Name: "betterIntergrateBusiness",
        Text: "Better integrate into a team/Business Unit",
        Value: "13"
      },
      {
        OrderId: 14,
        Name: "enhanceImpact",
        Text: "Enhance my impact and influence in my role/team",
        Value: "14"
      },
      {
        OrderId: 15,
        Name: "relationshipBuilding",
        Text: "Relationship building and networking",
        Value: "15"
      },
      {
        OrderId: 16,
        Name: "managingCareer",
        Text: "Manage a career transition",
        Value: "16"
      },
      {
         OrderId: 17,
        Name: "dealDiversity",
        Text: "Deal with diversity and inclusion challenges",
        Value: "17"
      },
      {
         OrderId: 18,
        Name: "enhanceTechnical",
        Text: "Enhance my technical skills",
        Value: "18"
      },
      {
         OrderId: 19,
        Name: "broadenKnowledge",
        Text: "Broaden my organizational knowledge",
        Value: "19"
      },
      {
         OrderId: 20,
        Name: "honeLeadership",
        Text: "Hone my leadership skills",
        Value: "20"
      }
    ],
    AgePreference: [
      {
         OrderId: 1,
        Name: "olderThanMe",
        Text: "Older than me",
        Value: 1
      },
      {
         OrderId: 2,
        Name: "youngerThanMe",
        Text: "Younger than me",
        Value: 2
      },
      {
         OrderId: 3,
        Name: "doesntMatter",
        Text: "Doesn't matter",
        Value: 3
      }
    ],
    SearchParams: [
      {
         OrderId: 1,
        Name: "yes",
        Text: "Yes",
        Value: 1
      },
      {
         OrderId: 2,
        Name: "no",
        Text: "No",
        Value: 2
      },
      {
         OrderId: 3,
        Name: "doesntmatter",
        Text: "Does't matter",
        Value: 3
      }
    ],
    Gender: [
      {
         OrderId: 1,
        Name: "male",
        Text: "Male",
        Value: 1
      },
      {
         OrderId: 2,
        Name: "female",
        Text: "Female",
        Value: 2
      },
      {
         OrderId: 3,
        Name: "doesntMatter",
        Text: "Doesn't matter",
        Value: 3
      }
    ]
  }
];

const mentors: Mentor[] = [
  {
    id: 0,
    MentorId: 0,
    EmployeeId: '5320712',
    ProfessionalBackground: null,
    Interest: null,
    Division: 'RMB',
    Passion: null,
    PriorRoles: null,
    Available: false,
    ReadTerms: false,
    UnitOfTime: 0,
    MentoringCommitment: 0,
    Comment: null,
    YearsOfExperience: null,
    CurrentRole: null,
    CreatedDateTime: null,
    MentorDomianArea: [],
    MentorExperience: [],
    UnitOfTimes: [
      {
        OrderId: '1',
        Name: 'month',
        Text: 'Month(s)',
        Value: '1'
      },
      {
        OrderId: '2',
        Name: 'year',
        Text: 'Year(s)',
        Value: '2'
      }
    ],
    Experiences: [
      {
        OrderId: '10',
        Name: 'supportService',
        Text: 'Support Services',
        Value: '10'
      },
      {
        OrderId: '11',
        Name: 'transacting',
        Text: 'Transacting',
        Value: '11'
      },
      {
        OrderId: '12',
        Name: 'trading',
        Text: 'Trading',
        Value: '12'
      },
      {
        OrderId: '13',
        Name: 'nonSpecific',
        Text: 'No specific preference',
        Value: '13'
      },
      {
        OrderId: '2',
        Name: 'businessTechnology',
        Text: 'Business Technology',
        Value: '2'
      },
      {
        OrderId: '3',
        Name: 'clientService',
        Text: 'Client Services',
        Value: '3'
      },
      {
        OrderId: '4',
        Name: 'credit',
        Text: 'Credit',
        Value: '4'
      },
      {
        OrderId: '5',
        Name: 'finance',
        Text: 'Finance',
        Value: '5'
      },
      {
        OrderId: '6',
        Name: 'humanCapital',
        Text: 'Human Capital',
        Value: '6'
      },
      {
        OrderId: '7',
        Name: 'legalRiskCompliance',
        Text: 'Legal, Risk and Compliance',
        Value: '7'
      },
      {
        OrderId: '8',
        Name: 'marketingCommunication',
        Text: 'Marketing and Communication',
        Value: '8'
      },
      {
        OrderId: '9',
        Name: 'operationProcess',
        Text: 'Operations/Processes/Admin',
        Value: '9'
      }
    ],
    DomainAreas: [
      {
        OrderId: '1',
        Name: 'broadenKnowledge',
        Text: 'Broaden his/her organisational knowledge',
        Value: '1'
      },
      {
        OrderId: '10',
        Name: 'helpingNavigateSystem',
        Text: 'Helping him/her ‘navigate’ the system',
        Value: '10'
      },
      {
        OrderId: '2',
        Name: 'enhanceTechnical',
        Text: 'Enhance his/her technical skills',
        Value: '2'
      },
      {
        OrderId: '3',
        Name: 'dealDiversity',
        Text: 'Deal with diversity and inclusion challenges',
        Value: '3'
      },
      {
        OrderId: '4',
        Name: 'honeLeadership',
        Text: 'Hone his/her leadership skills',
        Value: '4'
      },
      {
        OrderId: '5',
        Name: 'managingCareer',
        Text: 'Managing a career transition',
        Value: '5'
      },
      {
        OrderId: '6',
        Name: 'relationshipBuilding',
        Text: 'Relationship building and networking',
        Value: '6'
      },
      {
        OrderId: '7',
        Name: 'enhanceInfluence',
        Text: 'Enhance his/her impact and influence',
        Value: '7'
      },
      {
        OrderId: '8',
        Name: 'betterIntergrateBusiness',
        Text: 'Better integrate into a team/Business Unit',
        Value: '8'
      },
      {
        OrderId: '9',
        Name: 'offeringCareerGuidance',
        Text: 'Offering career guidance',
        Value: '9'
      }
    ]
  }
];
const mentorsall: Mentor[] =[
    {
      id: 0,
      MentorId: 1,
      EmployeeId: '5256534',
      ProfessionalBackground: 'Test Professional background',
      Interest: 'Test interests',
      Division: 'RMB',
      Passion: 'Test Passion Passion edit Allete IIIII',
      PriorRoles: 'Test prior roles',
      Available: true,
      ReadTerms: true,
      UnitOfTime: 2,
      MentoringCommitment: 10,
      Comment: 'Test commitment',
      YearsOfExperience: null,
      CurrentRole: 'BI Developer',
      CreatedDateTime: '2019-11-01T10:47:48.7328697',
      MentorDomianArea: [],
      MentorExperience: [],
      UnitOfTimes: null,
      Experiences: null,
      DomainAreas: null
    },
    {
      id:5,
      MentorId: 5,
      EmployeeId: '3339270',
      ProfessionalBackground: 'Test Professional background',
      Interest: 'Test interests',
      Division: 'RMB',
      Passion: 'Test Passion Passion edit Allete IIIII',
      PriorRoles: 'Test prior roles',
      Available: true,
      ReadTerms: true,
      UnitOfTime: 2,
      MentoringCommitment: 10,
      Comment: 'Test commitment',
      YearsOfExperience: null,
      CurrentRole: 'Talent Management Specialist',
      CreatedDateTime: '2019-11-06T11:31:34.3189772',
      MentorDomianArea: [],
      MentorExperience: [],
      UnitOfTimes: null,
      Experiences: null,
      DomainAreas: null
    },
    {
      id: 8,
      MentorId: 8,
      EmployeeId: '5149428',
      ProfessionalBackground: 'Test Professional background',
      Interest: 'Test interests',
      Division: 'RMB',
      Passion: 'Test Passion Passion edit Allete IIIII',
      PriorRoles: 'Test prior roles',
      Available: true,
      ReadTerms: true,
      UnitOfTime: 2,
      MentoringCommitment: 10,
      Comment: 'Test commitment',
      YearsOfExperience: null,
      CurrentRole: 'Project Manager',
      CreatedDateTime: '2019-11-07T12:15:47.8264473',
      MentorDomianArea: [
        {
          MentorDomainId: 1,
          MentorId: 8,
          DomainId: 1
        },
        {
          MentorDomainId: 3,
          MentorId: 8,
          DomainId: 3
        }
      ],
      MentorExperience: [
        {
          MentorExperienceId: 5,
          MentorId: 8,
          ExperienceId: 8
        },
        {
          MentorExperienceId: 6,
          MentorId: 8,
          ExperienceId: 9
        }
      ],
      UnitOfTimes: null,
      Experiences: null,
      DomainAreas: null
    },
    {
      id: 9,
      MentorId: 9,
      EmployeeId: '3604519',
      ProfessionalBackground: 'Test Professional background',
      Interest: 'Test interests',
      Division: 'RMB',
      Passion: 'Test Passion Passion edit',
      PriorRoles: 'Test prior roles',
      Available: true,
      ReadTerms: true,
      UnitOfTime: 2,
      MentoringCommitment: 10,
      Comment: 'Test commitment',
      YearsOfExperience: null,
      CurrentRole: 'Administrator',
      CreatedDateTime: '2019-11-28T13:02:55.3151411',
      MentorDomianArea: [
        {
          MentorDomainId: 4,
          MentorId: 9,
          DomainId: 1
        },
        {
          MentorDomainId: 5,
          MentorId: 9,
          DomainId: 2
        }
      ],
      MentorExperience: [
        {
          MentorExperienceId: 7,
          MentorId: 9,
          ExperienceId: 8
        },
        {
          MentorExperienceId: 8,
          MentorId: 9,
          ExperienceId: 9
        }
      ],
      UnitOfTimes: null,
      Experiences: null,
      DomainAreas: null
    },
    { id:12,
      MentorId: 12,
      EmployeeId: '4519094',
      ProfessionalBackground: 'Test Professional background',
      Interest: 'Test interests',
      Division: 'RMB',
      Passion: 'Test Passion Passion edit',
      PriorRoles: 'Test prior roles',
      Available: true,
      ReadTerms: true,
      UnitOfTime: 2,
      MentoringCommitment: 10,
      Comment: 'Test commitment',
      YearsOfExperience: null,
      CurrentRole: 'Talent Management Specialist',
      CreatedDateTime: '2019-11-28T13:13:51.6533714',
      MentorDomianArea: [
        {
          MentorDomainId: 10,
          MentorId: 12,
          DomainId: 1
        },
        {
          MentorDomainId: 11,
          MentorId: 12,
          DomainId: 2
        }
      ],
      MentorExperience: [
        {
          MentorExperienceId: 13,
          MentorId: 12,
          ExperienceId: 8
        },
        {
          MentorExperienceId: 14,
          MentorId: 12,
          ExperienceId: 9
        }
      ],
      UnitOfTimes: null,
      Experiences: null,
      DomainAreas: null
    },
    {
      id: 13,
      MentorId: 13,
      EmployeeId: '5320712',
      ProfessionalBackground: 'qr3qgt',
      Interest: 'q43t3qg',
      Division: 'RMB',
      Passion: 'efwq3q',
      PriorRoles: 'qregrqg',
      Available: true,
      ReadTerms: true,
      UnitOfTime: 2,
      MentoringCommitment: 1,
      Comment: 'qegtrg5g',
      YearsOfExperience: 0,
      CurrentRole: 'IT Developer',
      CreatedDateTime: '2019-11-29T09:26:41.5586077',
      MentorDomianArea: [
        {
          MentorDomainId: 12,
          MentorId: 13,
          DomainId: 1
        }
      ],
      MentorExperience: [
        {
          MentorExperienceId: 15,
          MentorId: 13,
          ExperienceId: 8
        }
      ],
      UnitOfTimes: null,
      Experiences: null,
      DomainAreas: null
    }
  ];
 
  // api http://rmb-vdv-aspn01/Evolve/ReflectWebAPI/api/mentor/search
// PUT
  // search object {
//   "SearchId": 1,
//   "SearchString": "sithe",
//   "Limit":10,
//   "Division": "RMB"
// }
  const searchmentor = [
    {
      EmployeeId: '5302927',
      FullName: 'Nonkululeko Sithepula'
    },
    {
      EmployeeId: '5320712',
      FullName: 'Sithelo Ngwenya'
    },
    {
      EmployeeId: '4755960',
      FullName: 'Sithembiso Gumede'
    },
    {
      EmployeeId: '5323754',
      FullName: 'Sithembiso Mamba'
    }
  ]

  const msubscription : MSubscription[] = [
    {
     // id: 1,
      MenteeId: 27,
      MentorId: null,
      MentorshipActivityId: null,
      MentorFullName: null,
      MenteeEmpId: null,
      MentorEmpId: null,
      MenteeFullName: 'Sithelo Ngwenya',
      Division: null,
      ShareProfile: true,
      FinYear: '',
      Status: 'Not Started',
      Duration: '0 - Month(s)',
      StartDate: null,
      EndDate: null
    },
    {
      //id: 2,
      MenteeId: 29,
      MentorId: null,
      MentorshipActivityId: null,
      MentorFullName: null,
      MenteeEmpId: null,
      MentorEmpId: null,
      MenteeFullName: 'Sithelo Ngwenya',
      Division: null,
      ShareProfile: true,
      FinYear: '',
      Status: 'Not Started',
      Duration: '0 - Month(s)',
      StartDate: null,
      EndDate: null
    },
    {
     // id: 3,
      MenteeId: 34,
      MentorId: null,
      MentorshipActivityId: null,
      MentorFullName: null,
      MenteeEmpId: null,
      MentorEmpId: null,
      MenteeFullName: 'Sithelo Ngwenya',
      Division: 'RMB',
      ShareProfile: true,
      FinYear: '',
      Status: 'Not Started',
      Duration: '0 - Month(s)',
      StartDate: null,
      EndDate: null
    },
    {
     // id: 4,
      MenteeId: 39,
      MentorId: null,
      MentorshipActivityId: null,
      MentorFullName: null,
      MenteeEmpId: null,
      MentorEmpId: null,
      MenteeFullName: 'Sithelo Ngwenya',
      Division: 'RMB',
      ShareProfile: true,
      FinYear: '',
      Status: 'Not Started',
      Duration: '0 - Month(s)',
      StartDate: null,
      EndDate: null
    },
    {
      //id: 5,
      MenteeId: 40,
      MentorId: null,
      MentorshipActivityId: null,
      MentorFullName: null,
      MenteeEmpId: null,
      MentorEmpId: null,
      MenteeFullName: 'Sithelo Ngwenya',
      Division: 'RMB',
      ShareProfile: true,
      FinYear: '',
      Status: 'Not Started',
      Duration: '0 - Month(s)',
      StartDate: null,
      EndDate: null
    },
    {
      //id: 6,
      MenteeId: 41,
      MentorId: null,
      MentorshipActivityId: null,
      MentorFullName: null,
      MenteeEmpId: null,
      MentorEmpId: null,
      MenteeFullName: 'Sithelo Ngwenya',
      Division: 'RMB',
      ShareProfile: true,
      FinYear: '',
      Status: 'Not Started',
      Duration: '0 - Month(s)',
      StartDate: null,
      EndDate: null
    },
    {
      //id: 7,
      MenteeId: 42,
      MentorId: null,
      MentorshipActivityId: null,
      MentorFullName: null,
      MenteeEmpId: null,
      MentorEmpId: null,
      MenteeFullName: 'Sithelo Ngwenya',
      Division: 'RMB',
      ShareProfile: true,
      FinYear: '',
      Status: 'Not Started',
      Duration: '0 - Month(s)',
      StartDate: null,
      EndDate: null
    },
    {
     // id: 8,
      MenteeId: 43,
      MentorId: null,
      MentorshipActivityId: null,
      MentorFullName: null,
      MenteeEmpId: null,
      MentorEmpId: null,
      MenteeFullName: 'Sithelo Ngwenya',
      Division: 'RMB',
      ShareProfile: true,
      FinYear: '',
      Status: 'Not Started',
      Duration: '0 - Month(s)',
      StartDate: null,
      EndDate: null
    },
    {
     // id: 9,
      MenteeId: 44,
      MentorId: null,
      MentorshipActivityId: null,
      MentorFullName: null,
      MenteeEmpId: null,
      MentorEmpId: null,
      MenteeFullName: 'Sithelo Ngwenya',
      Division: 'RMB',
      ShareProfile: true,
      FinYear: '',
      Status: 'Not Started',
      Duration: '0 - Month(s)',
      StartDate: null,
      EndDate: null
    },
    {
      //id: 10,
      MenteeId: 48,
      MentorId: null,
      MentorshipActivityId: null,
      MentorFullName: null,
      MenteeEmpId: null,
      MentorEmpId: null,
      MenteeFullName: 'Sithelo Ngwenya',
      Division: 'RMB',
      ShareProfile: true,
      FinYear: '',
      Status: 'Not Started',
      Duration: '0 - Month(s)',
      StartDate: null,
      EndDate: null
    }
  ]

 