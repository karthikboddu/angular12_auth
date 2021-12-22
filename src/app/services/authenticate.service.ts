import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable,Subject } from 'rxjs';
import {ApiendpointService } from './apiendpoint.service';
import { User } from '../models/user.model'
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
const baseUrl = 'http://localhost:8000/api/auth/signin';

@Injectable({
  providedIn: 'root'
})

export class AuthenticateService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public isLoggedIn = false;
  public token : any;
  constructor(private http: HttpClient, private endpoint: ApiendpointService,private router: Router) { 
    this.token = localStorage.getItem('userToken');
    this.currentUserSubject = new BehaviorSubject<User>(this.token);
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue() {
    if(this.getAccessToken() && this.getAccessToken() !=null){
      return true;
    }else{
      return false;
    }

    //return this.currentUserSubject.value;
  }

  login(username: any, password: any){
    return this.http.post<any>(this.endpoint.host+this.endpoint.login,{ username: username, password: password })
  //         .pipe(map(user => {
  //     this.userAutoLogout(3600000);
  //     // store user details and jwt token in local storage to keep user logged in between page refreshes
  //     localStorage.setItem('userToken', user.accessToken);
  //     localStorage.setItem("refreshToken",user.refreshToken);
  //     // this.currentUserSubject.next(user.accessToken);
  //     return user.accessToken;
  // }));
  }

  logout() {
    // remove user from local storage to log user out
    const token = localStorage.getItem('refreshToken');
    this.currentUserSubject.unsubscribe()
    return this.http.post(this.endpoint.host+this.endpoint.userLogout,{"refreshToken": token})
    

  }

  userAutoLogout(time:any){
    setInterval(() => {
      console.log("logout")
      const user = localStorage.getItem('userToken');
      this.verifyUserToken(user).subscribe((res:any)=>{
        if(!res.status){
          this.clearSessionOutToken()
          this.router.navigate(['register']);
        }
        })
    }, time);
  }
  userRegister(users: User){
    
    let userData = JSON.stringify(users)
    console.log(userData,"asd")
    return this.http.post(this.endpoint.host+this.endpoint.register,{"data":userData});
  }

  requestResetPassword(email:any){

    return this.http.post(this.endpoint.host+this.endpoint.requestResetPassword,{"email":email});

  }

  verifyUserToken(token:any){
    return this.http.post(this.endpoint.host+this.endpoint.verifyAccessToken,{"accessToken":token});
  }

  setLoginToken(token:any){
    localStorage.setItem("userToken",token.accessToken);
  }

  getAccessToken(){
    return localStorage.getItem('userToken');
  }
  getRefreshToken(){
    return localStorage.getItem('refreshToken');
  }

  setRefreshToken(token:any){
    localStorage.setItem("refreshToken",token.refreshToken);
  }

  clearLoginToken(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('refreshToken');
  }
  
  clearSessionOutToken(){
    localStorage.removeItem('userToken');
  }

  get isUserLoggedIn(){
    //const user = JSON.parse(localStorage.getItem("userToken")|| '{}');
    const user = localStorage.getItem('userToken');
    let userStatus;
    this.verifyUserToken(user).subscribe((res:any)=>{
      console.log(res.status,"**usertoken")
    })
    //const user = userJson !== null ? JSON.parse(userJson) : null;
   return (user !== null) ? user : false;
  }


  getPullReq() {

    let headers = new HttpHeaders();

    headers = headers.append('Authorization', 'Basic a2FydGhpa2JvZGR1OmtQdnNDRlVEOWRGZHo2dFdWSmh2');

    return this.http.get<any>("https://api.bitbucket.org/2.0/repositories/ipcphoenix/ipc-emi-scholar-generic/pullrequests?q=state="+'"merged"', { headers: headers });
  }

  getDiffStartFileUrl(url:any){
    let headers = new HttpHeaders();

    headers = headers.append('Authorization', 'Basic a2FydGhpa2JvZGR1OmtQdnNDRlVEOWRGZHo2dFdWSmh2');

    return this.http.get<any>(url, { headers: headers });
  }

  generateTar(url:any,workSlug:any){


    return this.http.post<any>('http://127arcler.com/api/v2.0/epub/generateBuild', { work_slug: 'ipc-emi-scholar-generic',diff_stat:url });
  }

  reAuthencticate(){
    
    return this.http.post(this.endpoint.host+this.endpoint.userReAuth,{"refreshToken":this.getRefreshToken()});

  }

}
