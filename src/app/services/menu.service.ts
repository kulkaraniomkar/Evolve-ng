import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { getAdminMenuData, getLeftMenuData, getTopMenuData } from './menu.service.config';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor() { }

  getLeftMenuData(): Observable<any[]> {
    return of(getLeftMenuData)
  }
  getAdminMenuData(): Observable<any[]> {
    return of(getAdminMenuData)
  }

  getTopMenuData(): Observable<any[]> {
    return of(getTopMenuData)
  }
}
