import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { MenteeSubscription } from '../core/model/mentee-subscription';

@Injectable({ providedIn: 'root' })
export class MenteeSubscriptionService extends EntityCollectionServiceBase<MenteeSubscription> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('MenteeSubscription', serviceElementsFactory);
  }

}