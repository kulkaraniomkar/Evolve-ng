import { IActivity, IActivityMatch } from '../activity.interface';


export interface IActivityHttp extends IActivity {

}
export interface IActivityService {
    activity: IActivity,
    matchType: number
}

