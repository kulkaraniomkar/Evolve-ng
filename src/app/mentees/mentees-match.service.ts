import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { MenteeMatch } from '../core/model/menteematch';

@Injectable({ providedIn: 'root' })
export class MenteesMatchService extends EntityCollectionServiceBase<MenteeMatch> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('MenteeMatch', serviceElementsFactory);
  }

}