import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SearchParams, SearchResults } from './model/mentor-search';
import { environment } from '../../environments/environment';
import { ToastService } from './toast.service';

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