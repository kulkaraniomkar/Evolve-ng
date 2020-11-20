import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { IActivityHttp, IActivityService } from '../models/http-models/activity-http.interface';
import { NzNotificationService } from 'ng-zorro-antd';

@Injectable()
export class ActivityService {
    apiUrlBase = environment.apiUrlBase;
    constructor(
        private _http: HttpClient,
        private _notification: NzNotificationService) { }

    /** get mentor mentee info for update */
    getActivity(mentorId: number, menteeId: number, matchTypeId: number, activityId: number): Observable<IActivityService> {
        return this._http.get<IActivityHttp>(`${this.apiUrlBase}/admin/match/get/${mentorId}/${menteeId}/${activityId}`)
            .pipe(
                tap(()=> this._notification.success('Activity', 'Activity retrieved successfully')),
                map(data => ({
                  activity: data,
                  matchType: matchTypeId
                })),
                catchError(this.handleError())
            )
    }
   
    private handleError<T>(requestData?: T) {
        console.log(requestData);
        return (res: HttpErrorResponse) => {
            this._notification.error('Activity', `Error: ${res.error['Message']}`);
            return throwError(res.error['Message']);
        };
    }
}