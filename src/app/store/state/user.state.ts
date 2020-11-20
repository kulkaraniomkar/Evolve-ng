
import { IUser } from 'src/app/models/user.interface';

export interface IUserState {
  user: IUser;
  loading: boolean;
}

export const initialUserState: IUserState = {
  user: { uid: '', email: '', displayName: '', photoURL: '', roles: [], token: '' },
  loading: false
};
