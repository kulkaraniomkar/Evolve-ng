import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';

import {environment} from '../../environments/environment';
// import {SecurityService} from './security.service';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  private securityBaseURL = environment.apiUrlBase;
  //private pricingInsightsBaseURL = environment.MARKET_INFO_BASE_URL;

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let dupReq = req;
    if (req.url.startsWith(this.securityBaseURL)) {
      dupReq = req.clone({
        withCredentials: true,
      });
      console.log('AuthenticationInterceptor Windows URL detected', req.url);
    } 
    // console.log('AuthenticationInterceptor outgoing headers', req.headers);
    return next.handle(dupReq);
  }
}
