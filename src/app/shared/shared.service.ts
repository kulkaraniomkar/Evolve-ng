import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Division } from '../core/model/division';
import { Mentortime } from '../core/model/mentor-time';
import { DisplayData } from '../core/model/display-data';

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
@Injectable({ providedIn: 'root' })
export class DisplayDataService extends EntityCollectionServiceBase<DisplayData> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('DisplayData', serviceElementsFactory);
  }

}
