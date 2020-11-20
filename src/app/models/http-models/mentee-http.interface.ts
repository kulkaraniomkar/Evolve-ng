import { IMentee } from '../mentee.interface';
import { ISubscription } from '../subscription.interface';
import { IPage } from '../page.interface';


export interface IMenteeHttp extends IMentee {

}
export interface IMenteeService {
    mentee: IMentee
}

export interface IMenteeSubscriptionService {
    menteeSubscription: ISubscription[];
    signupStatus: boolean;
    page: IPage;
}

