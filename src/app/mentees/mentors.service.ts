import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Mentor } from '../core/model/mentor';

@Injectable({ providedIn: 'root' })
export class MentorsService extends EntityCollectionServiceBase<Mentor> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Mentor', serviceElementsFactory);
  }

}