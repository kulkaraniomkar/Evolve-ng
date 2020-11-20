
import { IActivity } from 'src/app/models/activity.interface';

export interface IActivityState {
  activity: IActivity;
  matchType: number;
  loading: boolean;
}

export const initialActivityState: IActivityState = {
  activity: null,
  matchType: 1, // default ie manual matching
  loading: false
};
