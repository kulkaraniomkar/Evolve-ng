import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { IUser } from '../models/user.interface';
//import { TokenService } from './token.service';

const USER_AUTH_API_URL = `${environment.tokenUrl}identity/getuseridentity`
const httpOptions = {
    withCredentials: true,
}
@Injectable({ providedIn: 'root' })
export class IdentityService {

    apiUrlBase = environment.apiUrlBase;
    decodedUser: any = {};
    user: IUser;

    constructor(private http: HttpClient,
        //  private tokenService: TokenService
    ) { }

    getIdentity(): Observable<IUser> {
        return this.http.get<IUser>(USER_AUTH_API_URL, httpOptions)
            .pipe(
                map((data) => this.parseJwt(data['token']).setUser(this.decodedUser, data['token']))
            )
    }
    parseJwt(token: string) {
        if (!token) return this;
        localStorage.setItem('mentorship', token);
        //this.tokenService.publishTokenChange(token);
        var base64Url = token.split('.')[1]
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        var jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                })
                .join(''),
        )
        this.decodedUser = JSON.parse(jsonPayload)
        return this
    }
    private setUser(user: any, token: string) {
        this.user = {
            uid: user['employeeid'],
            email: user['sub'],
            displayName: user['name'],
            photoURL: user['employeeid'],
            token: token,
            roles: JSON.parse(user['roles']),
        }
        return this.user
    }

}