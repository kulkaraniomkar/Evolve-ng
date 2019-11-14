import { Injectable } from '@angular/core';

import { RequestInfo, InMemoryDbService } from 'angular-in-memory-web-api';

import { Division } from './model/division';

import { Mentortime } from './model/mentor-time';
import { Mentee } from './model/mentee';
import { MenteeMatch } from './model/menteematch';
import { MenteeSubscription } from './model/mentee-subscription';
import { Mentor } from './model/mentor';

/** In-memory database data */
interface Db {
  [collectionName: string]: any[];
}

@Injectable()
export class InMemoryDataService implements InMemoryDbService {

  /** True if in-mem service is intercepting; all requests pass thru when false. */
  active = true;
  maxId = 0;

  createDb(reqInfo?: RequestInfo) {
    return { mentortimes, divisions, mentees, menteematches, menteesubscriptions, mentors };
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
const menteematches: MenteeMatch[] = [
  {
    menteeId: 1,
    mentorId: 21,
    mentorFirstname: 'Frank',
    mentorLastname: 'Doe',
    division: 'Human Capital',
    position: 'IT Developer',
    score: 90,
    mentees: 13,
    email: 'frank.doe@rmb.co.za'
  },
  {
    menteeId: 2,
    mentorId: 21,
    mentorFirstname: 'Frank',
    mentorLastname: 'Doe',
    division: 'Human Capital',
    position: 'IT Developer',
    score: 90,
    mentees: 13,
    email: 'frank.doe@rmb.co.za'
  },
  {
    menteeId: 2,
    mentorId: 22,
    mentorFirstname: 'John',
    mentorLastname: 'Levy',
    division: 'Human Capital',
    position: 'Business Analyst',
    score: 50,
    mentees: 2,
    email: 'john.levy@rmb.co.za'
  },
  ,
  {
    menteeId: 3,
    mentorId: 23,
    mentorFirstname: 'Barbra',
    mentorLastname: 'Van der merwe',
    division: 'Human Capital',
    position: 'HR Executive',
    score: 78,
    mentees: 6,
    email: 'barbra.vandermerwe@rmb.co.za'
  }

]
const mentees: Mentee[] = [
  {
    id: 1,
    name: 'Sithelo',
    lastname: 'Ngwenya',
    email: 'sithelo.ngwenya@rmb.co.za',
    autoMatch: true,
    manualMatch: true,
    savedResult: false,
    interest: 'Rubgy',
    division: 'Human Capital',
    mentoringPeriod: '1 month',
    divisionPreference: true,
    gender: 'Male',
    mentorAge: '18-24',
    achievement: {
      learnSystem: false,
      careerGuidance: true,
      teamUnit: false,
      impactTeam: false,
      relationship: false,
      careerTransaction: false,
      leadershipSkills: false,
      diversity: false,
      broadenKnowledge: false,
    },
    experience: {
      businessTechnology: false,
      clientService: false,
      credit: false,
      finance: false,
      humanCapital: false,
      legalCompliance: false,
      marketingCommunication: false,
      operation: false,
      support: false,
    },
    comment: 'Interesting mentor',
    shareProfile: true,
    readTerms: true
  },
  {
    id: 2,
    name: 'Sithelo',
    lastname: 'Ngwenya',
    email: 'sithelo.ngwenya@rmb.co.za',
    autoMatch: true,
    manualMatch: true,
    savedResult: false,
    interest: 'Rubgy',
    division: 'Human Capital',
    mentoringPeriod: '1 month',
    divisionPreference: true,
    gender: 'Male',
    mentorAge: '18-24',
    achievement: {
      learnSystem: true,
      careerGuidance: true,
      teamUnit: false,
      impactTeam: false,
      relationship: false,
      careerTransaction: false,
      leadershipSkills: false,
      diversity: false,
      broadenKnowledge: false,
    },
    experience: {
      businessTechnology: false,
      clientService: false,
      credit: false,
      finance: false,
      humanCapital: false,
      legalCompliance: false,
      marketingCommunication: false,
      operation: false,
      support: false,
    },
    comment: 'Interesting mentor',
    shareProfile: true,
    readTerms: true
  },
  {
    id: 3,
    name: 'Sithelo',
    lastname: 'Ngwenya',
    email: 'sithelo.ngwenya@rmb.co.za',
    autoMatch: true,
    manualMatch: true,
    savedResult: true,
    interest: 'Rubgy',
    division: 'Human Capital',
    mentoringPeriod: '1 month',
    divisionPreference: true,
    gender: 'Male',
    mentorAge: '18-24',
    achievement: {
      learnSystem: true,
      careerGuidance: true,
      teamUnit: false,
      impactTeam: false,
      relationship: false,
      careerTransaction: false,
      leadershipSkills: false,
      diversity: false,
      broadenKnowledge: false,
    },
    experience: {
      businessTechnology: false,
      clientService: false,
      credit: false,
      finance: false,
      humanCapital: false,
      legalCompliance: false,
      marketingCommunication: false,
      operation: false,
      support: false,
    },
    comment: 'Interesting mentor',
    shareProfile: true,
    readTerms: true
  },
];
const divisions: Division[] = [
  {
    id: 1,
    name: 'First National Bank'
  },
  {
    id: 2,
    name: 'FirstRand Corporate Centre'
  },
  {
    id: 3,
    name: 'RMB'
  },
  {
    id: 4,
    name: 'RMB NG'
  }
];
const mentortimes: Mentortime[] = [
  {
    id: 1,
    name: '1 month'
  },
  {
    id: 2,
    name: '2 month'
  },
  {
    id: 3,
    name: '3 month'
  },
  {
    id: 4,
    name: '3 - 6 months'
  },
  {
    id: 5,
    name: '6 - 12 months'
  },
  {
    id: 6,
    name: '> 12 months'
  }
];
const menteesubscriptions: MenteeSubscription[]=[
  {
    id: 1,
    mentorId: 2,
    mentorFirstname: 'Sithelo',
    mentorLastname: 'Ngwenya',
    startDate: new Date("October 13, 2014 11:13:00"),
    finishDate: new Date("October 13, 2014 11:13:00"),
    duration: '3 months',
    shareProfile: true,
    finYear: 2019,
    division:'Human Capital',
    },
    {
      id: 2,
      mentorId: 3,
      mentorFirstname: 'Olwethu',
      mentorLastname: 'Ngwenya',
      startDate: new Date("October 13, 2014 11:13:00"),
      finishDate: new Date("October 13, 2014 11:13:00"),
      duration: '3 months',
      shareProfile: false,
      finYear: 2018,
      division:'Human Capital',
      }

]
// list of mentors for the typeahead
const  mentors: Mentor[]=[
  {
    id: 1,
    name: "Sithelo Ngwenya"
  },
  {
    id: 5,
    name: "Olwethu Ngwenya"
  },
  {
    id: 2,
    name: "Marshall Nyamadzawo"
  },
  {
    id: 3,
    name: "Tabisa Kweyama"
  },
  {
    id: 4,
    name: "Mandy Silverstone"
  }
]