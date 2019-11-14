import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Mentee } from '../core/model/mentee';

@Injectable({ providedIn: 'root' })
export class MenteesService extends EntityCollectionServiceBase<Mentee> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Mentee', serviceElementsFactory);
  }

}