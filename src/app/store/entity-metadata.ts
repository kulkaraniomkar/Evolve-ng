import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Mentor: {},
  Mentee: {},
  MenteeSubscription: {},
  Division: {},
  Mentortime: {},
  MenteeMatch: {},
  DisplayData: {},
  MenteeDisplayData: {}
};

const pluralNames = { };

export const entityConfig = {
  entityMetadata,
  pluralNames
};