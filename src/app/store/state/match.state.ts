
import { IMatch, IMatchesCreate } from 'src/app/models/match.interface';
import { IManualMatch } from 'src/app/models/manual-match.interface';
import { IPage } from 'src/app/models/page.interface';
import { IMatchRegister } from 'src/app/models/match-register.interface';

export interface IMatchState {
  matches: IMatch[];
  manual_matches: IManualMatch[];
  error: string;
  page: IPage;
  saved_matches: IMatchesCreate;
  match: IMatchRegister;
  loading: boolean;
}

export const initialMatchState: IMatchState = {
  matches: null,
  manual_matches: null,
  error: null,
  page: { pageNumber: 1, pageSize: 5, totalItems: 0 },
  saved_matches: null,
  match: null,
  loading: false
};
