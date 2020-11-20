
import { IMentor, IMentorInfo, IMentorExtra, ISuggestedMentor } from 'src/app/models/mentor.interface';
import { IPage } from 'src/app/models/page.interface';
import { ISubscription } from 'src/app/models/subscription.interface';

export interface IMentorState {
  mentor: IMentor;
  mentorSubscription: ISubscription[];
  mentorExtra: IMentorExtra;
  mentorSearch: ISuggestedMentor[];
  loadingSearch: boolean;
  page: IPage;
  signupStatus: boolean;
  loading: boolean;
}

export const initialMentorState: IMentorState = {
  mentor: null,
  mentorSubscription: null,
  mentorExtra: null,
  mentorSearch: null,
  loadingSearch: false,
  signupStatus: false,
  page: { pageNumber: 1, pageSize: 5, totalItems: 0 },
  loading: false
};
