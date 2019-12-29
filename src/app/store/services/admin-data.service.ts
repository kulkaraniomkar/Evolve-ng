import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { DataServiceError } from './data-error.service';
import { environment } from '../../../environments/environment';
import { MSubscription } from '../../core/model/m-subscriptions';
import { ToastService } from '../../core/toast.service';
import { MentorMatch, SavedMatch, MentorMatchInfo } from '../../core/model/mentor-match';
import { MentorMentee, MentorMenteeIds, MatchCreate, ManualMatch } from '../../core/model/mentor-mentee';
import { CreateMatch } from '../actions';

@Injectable()
export class MSubscriptionDataService {

  apiUrlBase = environment.apiUrlBase;

  constructor(private http: HttpClient,
    private toastService: ToastService) {}

  getMSubscriptions(): Observable<MSubscription[]> {
    const msg = 'Mentee subscriptions retrieved successfully!';
   return this.http.get<MSubscription[]>(`${this.apiUrlBase}/admin/GetPendingSubscriptions`)
   // return this.http.get<MSubscription[]>(`${this.apiUrlBase}/msubscription`)
    .pipe(
      tap(() => this.toastService.openSnackBar(msg, 'GET')),
      map(res =>res['results']),
      catchError(this.handleError())
    );
  }

  getAutomatch(menteeId: number): Observable<MentorMatch[]> {
    const msg = 'Auto match list retrieved successfully!';
   return this.http.get<MentorMatch[]>(`${this.apiUrlBase}/admin/runautomatching/${menteeId}`)
   // return this.http.get<MSubscription[]>(`${this.apiUrlBase}/msubscription`)
    .pipe(
      tap(() => this.toastService.openSnackBar(msg, 'GET')),
      map(res =>res['results']),
      catchError(this.handleError())
    );
  }
  addSavedMatch(savedMatch: SavedMatch): Observable<SavedMatch> {
    const msg = 'Saved matches successfully!';
    return this.http.post<SavedMatch>(`${this.apiUrlBase}/admin/tempmatch/create`, savedMatch)
    .pipe(
      tap(() => this.toastService.openSnackBar(msg, 'GET')),
      catchError(this.handleError(savedMatch))
    );
  }
  addCreateMatch(createMatch: MatchCreate): Observable<MatchCreate> {
    const msg = 'Created successfully!';
    return this.http.post<MatchCreate>(`${this.apiUrlBase}/admin/match/create/${createMatch.MentorId}/${createMatch.MenteeId}`, createMatch)
    .pipe(
      tap(() => this.toastService.openSnackBar(msg, 'POST')),
      catchError(this.handleError(createMatch))
    );
  }

  removeSavedMatch(savedMatch: SavedMatch): Observable<SavedMatch> {
    const msg = 'Removed saved matches successfully!';
    return this.http.delete<SavedMatch>(`${this.apiUrlBase}/admin/tempmatching/remove/${savedMatch.MenteeId}`)
    .pipe(
      tap(() => this.toastService.openSnackBar(msg, 'DELETE')),
      catchError(this.handleError(savedMatch))
    );
  }

  getMentorMatchInfo(mentorId: number): Observable<MentorMatchInfo> {
    const msg = 'Mentor/Mentee info retrieved successfully!';
    return this.http.get<MentorMatchInfo>(`${this.apiUrlBase}/admin/getmentorinfo/${mentorId}`)
    .pipe(
      tap(() => this.toastService.openSnackBar(msg, 'GET')),
      catchError(this.handleError(mentorId))
    );
  }
  getMentorMentee(mm: MentorMenteeIds): Observable<MentorMentee> {
    const msg = 'Mentor/Mentee information retrieved successfully!';
    return this.http.get<MentorMentee>(`${this.apiUrlBase}/admin/get/${mm.mentorId}/${mm.menteeId}/0`)
    .pipe(
      tap(() => this.toastService.openSnackBar(msg, 'GET')),
      catchError(this.handleError(mm))
    );
  }
 
  getManualMentors(menteeid: number): Observable<ManualMatch[]> {
    const msg = 'Manual match mentors retrieved successfully!';
    return this.http.get<ManualMatch[]>(`${this.apiUrlBase}/admin/tempmatch/get/${menteeid}`)
    .pipe(
      tap(() => this.toastService.openSnackBar(msg, 'GET')),
      map(res =>res['results']),
      catchError(this.handleError(menteeid))
    );
  }


  private handleError<T>(requestData?: T) {
    return (res: HttpErrorResponse) => {
      const error = new DataServiceError(res.error, requestData);
      console.error(error);
      // return new ErrorObservable(error);
      return throwError(error);
    };
  }
}