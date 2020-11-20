
import { IMentee } from 'src/app/models/mentee.interface';
import { ISubscription } from 'src/app/models/subscription.interface';
import { IPage } from 'src/app/models/page.interface';

export interface IMenteeState {
  mentee: IMentee;
  menteeSubscription: ISubscription[];
  signupStatus: boolean;
  page: IPage;
  loading: boolean;
}

export const initialMenteeState: IMenteeState = {
  mentee: null,
  menteeSubscription: null,
  signupStatus: false,
  page: { pageNumber: 1, pageSize: 5, totalItems: 0 },
  loading: false
};
