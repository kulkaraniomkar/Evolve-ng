import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';

import {environment} from '../../environments/environment';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  private securityBaseURL = environment.apiUrlBase;

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let dupReq = req;
    if (req.url.startsWith(this.securityBaseURL)) {
      dupReq = req.clone({
        withCredentials: true,
      });
      console.log('AuthenticationInterceptor Windows URL detected', req.url);
    } 
   
    return next.handle(dupReq);
  }
}
