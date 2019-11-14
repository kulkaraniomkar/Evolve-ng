import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { MenteeList } from '../core/model/menteelist';

@Injectable({ providedIn: 'root' })
export class MenteesListService extends EntityCollectionServiceBase<MenteeList> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('MenteeList', serviceElementsFactory);
  }

}