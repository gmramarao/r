import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
    authToken: any;
    user: any;
    url = 'http://localhost:3000/';
    constructor(private http: Http) { }
    registerUser(user) {
      const header = new Headers();
      header.append('Content-Type', 'application/json');
      return this.http.post(this.url+'vendor/register', user, { headers: header }).map(res => res.json());
    }
    authenticateUser(user) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        return this.http.post(this.url+'vendor/authenticate', user, { headers: header }).map(res => res.json());
    }
    authenticateMobile(mobile: string) {
      return this.http.get(this.url+'vendor/find-mobile/' + mobile).map(res => res.json());
    }
    authenticateEmail(email: string) {
      return this.http.get(this.url+'vendor/find-email/' + email).map(res => res.json());
    }
    getUserFromLocal() {
        const user = localStorage.getItem('user');
        return user;
    }
    updateUser(user) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        return this.http.post(this.url+'vendor/update-user', user, { headers: header }).map(res => res.json());
    }
    updatePassword(pwd) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        return this.http.post(this.url+'vendor/update-pwd', pwd, { headers: header }).map(res => res.json());
    }
    storeUserData(token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    }
    loggedIn() {
        return tokenNotExpired('id_token');
    }
    logout() {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    }
    requestVerification(mobile){
        return this.http.get(this.url+'vendor/request-verification/' + mobile).map(res => res.json());
    }
    verifyCode(data) {
        return this.http.put(this.url+'vendor/verify-Code', data).map(res => res.json());
    }
    resetPwd(data){
        return this.http.put(this.url+'vendor/reset-pwd', data).map(res => res.json());
    }
}

