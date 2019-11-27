import { Injectable } from '@angular/core';

import { RequestInfo, InMemoryDbService } from 'angular-in-memory-web-api';
import { Mentee } from './model/mentee';

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
    return { mentees };
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
        Value: 11
      },
      {
        OrderId: 12,
        Name: "careerGuidance",
        Text: "Career guidance",
        Value: 12
      },
      {
        OrderId: 13,
        Name: "betterIntergrateBusiness",
        Text: "Better integrate into a team/Business Unit",
        Value: 13
      },
      {
        OrderId: 14,
        Name: "enhanceImpact",
        Text: "Enhance my impact and influence in my role/team",
        Value: 14
      },
      {
        OrderId: 15,
        Name: "relationshipBuilding",
        Text: "Relationship building and networking",
        Value: 15
      },
      {
        OrderId: 16,
        Name: "managingCareer",
        Text: "Manage a career transition",
        Value: 16
      },
      {
         OrderId: 17,
        Name: "dealDiversity",
        Text: "Deal with diversity and inclusion challenges",
        Value: 17
      },
      {
         OrderId: 18,
        Name: "enhanceTechnical",
        Text: "Enhance my technical skills",
        Value: 18
      },
      {
         OrderId: 19,
        Name: "broadenKnowledge",
        Text: "Broaden my organizational knowledge",
        Value: 19
      },
      {
         OrderId: 20,
        Name: "honeLeadership",
        Text: "Hone my leadership skills",
        Value: 20
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