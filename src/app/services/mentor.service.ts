import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { IMentorHttp, IMentorService, IMentorSubscriptionService, IMentorEditService, IMentorEditHttp, IMentorExtraDetailsService, IMentorExtraDetailsHttp,  ISuggestedMentorService } from '../models/http-models/mentor-http.interface';
import { IPage } from '../models/page.interface';
import { IMentor, IMentorEdit, ISuggestedMentorParams, ISuggestedMentor } from '../models/mentor.interface';
import { NzNotificationService } from 'ng-zorro-antd';
import { ISubscriptionsHttp } from '../models/http-models/subscription-http.interface';

@Injectable()
export class MentorService {
  apiUrlBase = environment.apiUrlBase;
  constructor(
    private _http: HttpClient,
    private _notification: NzNotificationService) { }
  /** search mentor */
    searchMentor(searchParams: ISuggestedMentorParams): Observable<ISuggestedMentorService> {
      return this._http.put<ISuggestedMentor[]>(`${this.apiUrlBase}/mentor/search`, searchParams)
        .pipe(
          map(data => ({
            suggestedMentors: data
          })),
          catchError(this.handleError())
        );
    }
  /** get mentor */
  getMentorById(mentorId: number): Observable<IMentorService> {
    return this._http.get<IMentorHttp>(`${this.apiUrlBase}/mentor/get/${mentorId}`)
      .pipe(
        map(data => ({
          mentor: data
        })),
        catchError(this.handleError())
      )
  }
  /** get mentor extra details */
  getMentorDetailsById(mentorId: number): Observable<IMentorExtraDetailsService> {
    return this._http.get<IMentorExtraDetailsHttp>(`${this.apiUrlBase}/admin/getmentorinfo/${mentorId}`)
      .pipe(
        tap(d => console.log(d)),
        map(result => ({
          mentor: result.MentorRegInfo,
          mentorExtra: result.MentorInfo
        })),
        catchError(this.handleError())
      )
  }
  getMentorSubscription(paging: IPage): Observable<IMentorSubscriptionService> {
    return this._http.get<ISubscriptionsHttp>(`${this.apiUrlBase}/mentor/getmentorsubscriptions/${paging.pageNumber}/${paging.pageSize}`)
      .pipe(
        tap(() => this._notification.success('Mentees registered', 'Retrieved successfully')),
        map(results => ({
          page: {
            pageNumber: results.pageNumber,
            pageSize: results.pageSize,
            totalItems: results.totalItems,
          },
          signupStatus: results.Registered,
          mentorSubscription: results.data
        })),
        catchError(this.handleError())
      )
  }

  addMentor(newMentor: IMentorEdit): Observable<IMentorEditService> {
    return this._http.post<IMentorEditHttp>(`${this.apiUrlBase}/mentor/create`, newMentor)
      .pipe(
        tap(() => this._notification.success('Mentor', 'Registered')),
        map(data => ({
          signupStatus: data['Registered']
        })),
        catchError(this.handleError(newMentor))
      );
  }
  updateMentor(updateMentor: IMentorEdit): Observable<IMentorEditService> {
    const msg = 'Mentor updated successfully!';
    return this._http.put<IMentorEditHttp>(`${this.apiUrlBase}/mentor/update/${updateMentor.MentorId}`, updateMentor)
      .pipe(
        tap(() => this._notification.success('Mentor Update', 'Updated successfully')),
        map(data => ({
          signupStatus: data['Registered']
        })),
        catchError(this.handleError(updateMentor))
      );
  }
  private handleError<T>(requestData?: T) {
    return (res: HttpErrorResponse) => {
      this._notification.error('Mentor', `Error: ${res.error['Message']}`);
      return throwError(res.error['Message']);
    };
  }
}