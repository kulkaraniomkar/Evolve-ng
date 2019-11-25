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
    'id': 1,
    'name': 'Ted James',
    'city': 'Phoenix',
    'orderTotal': 40.99
  },
  {
    'id': 2,
    'name': 'Michelle Thompson',
    'city': 'Los Angeles',
    'orderTotal': 89.99
  },
  {
    'id': 3,
    'name': 'James Thomas',
    'city': 'Las Vegas',
    'orderTotal': 29.99
  },
  {
    'id': 4,
    'name': 'Tina Adams',
    'city': 'Seattle',
    'orderTotal': 15.99
  }
];