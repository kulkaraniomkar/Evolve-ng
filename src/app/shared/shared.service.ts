import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Division } from '../core/model/division';
import { Mentortime } from '../core/model/mentor-time';

@Injectable({ providedIn: 'root' })
export class DivisionsService extends EntityCollectionServiceBase<Division> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Division', serviceElementsFactory);
  }

}
@Injectable({ providedIn: 'root' })
export class MentorTimesService extends EntityCollectionServiceBase<Mentortime> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Mentortime', serviceElementsFactory);
  }

}
