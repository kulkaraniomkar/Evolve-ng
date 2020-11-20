import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IMatch, IMatchesCreate, IManualMatchesPayload, IManualSearchPayload } from '../models/match.interface';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { IMatchesHttp, IMatchService, IMatchesCreateHttp, IMatchesCreateService, IManualMatchesHttp, IManualMatchesService } from '../models/http-models/match-http.interface';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { IMatchRegister } from '../models/match-register.interface';
import { IPage } from '../models/page.interface';

@Injectable()
export class MatchService {
    apiUrlBase = environment.apiUrlBase;
    constructor(
        private _http: HttpClient,
        private _notification: NzNotificationService) { }
    /** get auto matches */
    getAutoMatches(menteeId: number): Observable<IMatchService> {
        return this._http.get<IMatchesHttp>(`${this.apiUrlBase}/admin/runautomatching/${menteeId}`)
            .pipe(
                map(data => ({
                    matches: data.results,
                    error: data.Error
                })),
                catchError(this.handleError())
            )
    }

     /** get saved matches */
     getSavedMatches(menteeId: number): Observable<IMatchService> {
        return this._http.get<IMatchesHttp>(`${this.apiUrlBase}/admin/tempmatch/get/${menteeId}`)
            .pipe(

                tap(data => data.results.length ? this._notification.success('Matches', 'Retrieved successfully') : this._notification.success('Matches', `${data.Error}`)),
                map(data => ({
                    matches: data.results,
                    error: data.Error
                })),
                catchError(this.handleError())
            )
    }
     /** remove saved matches */
     deleteSavedMatches(menteeId: number): Observable<string> {
        return this._http.delete<string>(`${this.apiUrlBase}/admin/tempmatching/remove/${menteeId}`)
            .pipe(
                tap((data)=> { console.log(data); this._notification.success('Matches', 'Deleted successfully')}),
                //map(() => ({matches: null})),
                catchError(this.handleError())
            )
    }

    /** save activity matches */
    saveAutoMatches(matchesCreate: IMatchesCreate): Observable<any> {
        return this._http.post<IMatchesCreateHttp>(`${this.apiUrlBase}/admin/tempmatch/create`, matchesCreate)
            .pipe(
                tap(()=> this._notification.success('Matches', 'Saved successfully')),
                map(data => ({
                    saved_matches: data
                })),
                catchError(this.handleError())
            )
    }

     /** save activity match */
     saveMatch(matchRegister: IMatchRegister): Observable<any> {
        return this._http.post<IMatchRegister>(`${this.apiUrlBase}/admin/match/create/${matchRegister.MentorId}/${matchRegister.MenteeId}`, matchRegister)
            .pipe(
                tap(()=> this._notification.success('Match', 'Saved successfully')),
                catchError(this.handleError(matchRegister))
            )
    }
      /** save mentorship activity */
  updateMentorshipActivity(mentorship: IMatchRegister): Observable<any> {
    return this._http.put<IMatchRegister>(`${this.apiUrlBase}/admin/match/update/${mentorship.MentoshipActivityId}`, mentorship)
        .pipe(
            tap(()=> this._notification.success('Mentorship activity', 'Updated successfully')),
            map(data => ({
                selectedMentorship: data
            })),
            catchError(this.handleError())
        )
}
    /** get manual matches */
    getManualMatches(manualMatchMentee : IManualMatchesPayload): Observable<IManualMatchesService> {
        return this._http.get<IManualMatchesHttp>(`${this.apiUrlBase}/admin/runmanualmatching/${manualMatchMentee.menteeId}/${manualMatchMentee.page.pageNumber}/${manualMatchMentee.page.pageSize}`)
            .pipe(
                tap(results => { results.data ? this._notification.success('Matches', 'Manual matches results') : this._notification.success('Matches', 'No mentors available')}),
                map(results => ({
                    manualMenteeMatches: results.data,
                    page: {
                        pageNumber: results.pageNumber,
                        pageSize: results.pageSize,
                        totalItems: results.totalItems,
                    },
                })),
                catchError(this.handleError())
            )
    }
     /** search for manual match */
     searchManual(manualMatchSearch: IManualSearchPayload): Observable<IManualMatchesService> {       
        return this._http.get<IManualMatchesHttp>(`${this.apiUrlBase}/admin/mentor/search/manual/${manualMatchSearch.searchParam}/${manualMatchSearch.menteeId}/${manualMatchSearch.page.pageNumber}/${manualMatchSearch.page.pageSize}`)
          .pipe(
            tap(()=> this._notification.success('Search', 'Searched manual mentors successfully')),
            map(results => ({
              page: {
                pageNumber: results.pageNumber,
                pageSize: results.pageSize,
                totalItems: results.totalItems,
                // number: data.PageNumber
              },
              manualMenteeMatches: results.data
            })),
            catchError(this.handleError())
          )
      }

    private handleError<T>(requestData?: T) {
        return (res: HttpErrorResponse) => {
          
            console.log(res);
            const errMsg = res ? res['statusText'] : 'No match found';
            this._notification.error('Matches error', `${res['error']['Message']}`);
            //this.messageService.add({ severity: 'error', summary: 'Error Message', detail: `${res.error['Message']}` });
            return throwError(res);
        };
    }
}