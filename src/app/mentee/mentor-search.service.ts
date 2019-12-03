import { Injectable } from '@angular/core';
import { SearchParams, SearchResults } from '../core/model/mentor-search';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ToastService } from '../core/toast.service';

@Injectable({
  providedIn: 'root'
})
export class MentorSearchService {
  apiUrlBase = environment.apiUrlBase;
  constructor(private http: HttpClient, private toastService: ToastService) { }

  search(searchParams: SearchParams): Observable<SearchResults[]> {
    const msg = 'Mentor retrieved successfully!';
    return this.http.put<SearchResults[]>(`${this.apiUrlBase}/mentor/search`, searchParams)
      .pipe(
        tap(() => this.toastService.openSnackBar(msg, 'Auto Search')),
        map(res => res.length > 0 ? res : [{EmployeeId: 0, FullName: 'No results to display' }])
      );
  }
}
