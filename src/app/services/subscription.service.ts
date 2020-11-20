import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { IPage } from '../models/page.interface';
import { ISubscriptionsHttp, ISubscriptionService, IAllocatedMentorHttp, IAllocatedMentorService, IPendingMenteesService, IUnallocatedMentorsService, IExploratoryMentorshipService } from '../models/http-models/subscription-http.interface';
import { IMenteesPerMentorService, IMenteesPerMentorHttp } from '../models/subscription.interface';

@Injectable()
export class SubscriptionService {
  apiUrlBase = environment.apiUrlBase;
  constructor(
    private _http: HttpClient,
    private _notification: NzNotificationService,
  ) { }

  getPendingSubscriptions(paging: IPage): Observable<IPendingMenteesService> {
    return this._http.get<ISubscriptionsHttp>(`${this.apiUrlBase}/admin/getPendingSubscriptions/${paging.pageNumber}/${paging.pageSize}`)
      .pipe(
        tap(() => this._notification.success('Pending subscriptions', 'Retrieved successfully')),
        map(results => ({
          pagePending: {
            pageNumber: results.pageNumber,
            pageSize: results.pageSize,
            totalItems: results.totalItems,
          },
          pendingMentees: results.data
        })),
        catchError(this.handleError())
      )
  }
  /** get allocated mentor */
  getAllocatedMentor(paging: IPage): Observable<IAllocatedMentorService> {
    return this._http.get<IAllocatedMentorHttp>(`${this.apiUrlBase}/admin/getallmentorsallocated/${paging.pageNumber}/${paging.pageSize}`)
      .pipe(
        tap((d) => console.log(d)),
        map(results => ({

          allocatedMentors: results.data.map(a => {
            return { ...a, expand: false, allocatedMentees: [] }
          }),
          pageAllocated: {
            pageNumber: results.pageNumber,
            pageSize: results.pageSize,
            totalItems: results.totalItems,
          },
        })),
        catchError(this.handleError())
      )
  }

  /** get nested mentees */
  getMenteesPerMentor(mentorId: number, paging: IPage): Observable<IMenteesPerMentorService> {
    console.log(paging);
    return this._http.get<IMenteesPerMentorHttp>(`${this.apiUrlBase}/admin/getmenteesundermentor/${mentorId}/${paging.pageNumber}/${paging.pageSize}`)
      .pipe(
        tap(() => this._notification.success('Mentees per mentor', 'Retrieved successfully')),
        map(results => ({
          pageNested: {
            pageNumber: results.pageNumber,
            pageSize: results.pageSize,
            totalItems: results.totalItems,
          },
          menteesPerMentor: results.data,
          //mentorId: mentorId
        })),
        catchError(this.handleError())
      )
  }
  /** get unallocated */
  getUnAllocatedSubscriptions(paging: IPage): Observable<IUnallocatedMentorsService> {
    console.log(paging);
    return this._http.get<ISubscriptionsHttp>(`${this.apiUrlBase}/admin/getallmentorsnotallocated/${paging.pageNumber}/${paging.pageSize}`)
      .pipe(
        tap(() => this._notification.success('Unallocated mentors', 'Retrieved successfully')),
        map(results => ({
          pageUnallocated: {
            pageNumber: results.pageNumber,
            pageSize: results.pageSize,
            totalItems: results.totalItems,
            // number: data.PageNumber
          },
          unallocatedMentors: results.data
        })),
        catchError(this.handleError())
      )
  }
  /** get exploratory */
  getExploratorySubscriptions(paging: IPage): Observable<IExploratoryMentorshipService> {
    console.log(paging);
    return this._http.get<ISubscriptionsHttp>(`${this.apiUrlBase}/admin/getmentorsonexploratory/${paging.pageNumber}/${paging.pageSize}`)
      .pipe(
        tap(() => this._notification.success('Exploratory subscriptions', 'Retrieved successfully')),
        map(results => ({
          pageExploratory: {
            pageNumber: results.pageNumber,
            pageSize: results.pageSize,
            totalItems: results.totalItems,
            // number: data.PageNumber
          },
          exploratoryMentorship: results.data
        })),
        catchError(this.handleError())
      )
  }
  /** search for mentee */
  getMenteeSearch(searchParam: string, paging: IPage): Observable<ISubscriptionService> {
    console.log(paging);
    return this._http.get<ISubscriptionsHttp>(`${this.apiUrlBase}/admin/mentee/search/${searchParam}/${paging.pageNumber}/${paging.pageSize}`)
      .pipe(
        tap(() => this._notification.success('Search', 'Searched successfully')),
        map(results => ({
          page: {
            pageNumber: results.pageNumber,
            pageSize: results.pageSize,
            totalItems: results.totalItems,
            // number: data.PageNumber
          },
          subscriptions: results.data
        })),
        catchError(this.handleError())
      )
  }
  /** search for unallocated */
  getSearchUnallocated(searchParam: string, paging: IPage): Observable<IUnallocatedMentorsService> {
    console.log(paging);
    return this._http.get<ISubscriptionsHttp>(`${this.apiUrlBase}/admin/mentor/search/unallocated/${searchParam}/0/${paging.pageNumber}/${paging.pageSize}`)
      .pipe(
        tap(() => this._notification.success('Search', 'Searched Unallocated successfully')),
        map(results => ({
          pageUnallocated: {
            pageNumber: results.pageNumber,
            pageSize: results.pageSize,
            totalItems: results.totalItems,
            // number: data.PageNumber
          },
          unallocatedMentors: results.data
        })),
        catchError(this.handleError())
      )
  }
  /** search for exploratory */
  getSearchExploratory(searchParam: string, paging: IPage): Observable<IExploratoryMentorshipService> {
    console.log(paging);
    return this._http.get<ISubscriptionsHttp>(`${this.apiUrlBase}/admin/mentor/search/exploratory/${searchParam}/0/${paging.pageNumber}/${paging.pageSize}`)
      .pipe(
        tap(() => this._notification.success('Search', 'Searched exploratory successfully')),
        map(results => ({
          pageExploratory: {
            pageNumber: results.pageNumber,
            pageSize: results.pageSize,
            totalItems: results.totalItems,
            // number: data.PageNumber
          },
          exploratoryMentorship: results.data
        })),
        catchError(this.handleError())
      )
  }
  /** search for allocated */
  getSearchAllocated(searchParam: string, paging: IPage): Observable<IAllocatedMentorService> {
    return this._http.get<IAllocatedMentorHttp>(`${this.apiUrlBase}/admin/mentor/search/allocated/${searchParam}/0/${paging.pageNumber}/${paging.pageSize}`)
      .pipe(
        tap(() => this._notification.success('Search', 'Searched allocated successfully')),
        map(results => ({
          pageAllocated: {
            pageNumber: results.pageNumber,
            pageSize: results.pageSize,
            totalItems: results.totalItems,
            // number: data.PageNumber
          },
          allocatedMentors:  results.data.map(a => {
            return { ...a, expand: false, allocatedMentees: [] }
          }),
        })),
        catchError(this.handleError())
      )
  }
  private handleError<T>(requestData?: T) {
    console.log(requestData);
    return (res: HttpErrorResponse) => {
      this._notification.error('Subscriptions', `Error: ${res.error['Message']}`);
      return throwError(res.error['Message']);
    };
  }
}