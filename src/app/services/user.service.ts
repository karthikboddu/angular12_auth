import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable,Subject } from 'rxjs';
import {ApiendpointService } from './apiendpoint.service';
import { Router } from '@angular/router';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private endpoint: ApiendpointService,private router: Router
    ,private authService : AuthenticateService) { }


  getUserLoginInfo(){

    let headers = new HttpHeaders();
    const token:any = this.authService.getAccessToken();
    headers = headers.append('x-access-token',token);

    return this.http.get<any>(this.endpoint.host+this.endpoint.userLoginDetails,{headers: headers})
  }
  getPreUserLoginInfo(){
    
    let headers = new HttpHeaders();
    const token:any = this.authService.getRefreshToken();
    headers = headers.append('x-access-token',token);

    return this.http.get<any>(this.endpoint.host+this.endpoint.userPreLoginDetails,{headers: headers})
  }

  getSeatsDataInfo(id:any){

    // let headers = new HttpHeaders();
    // const token:any = this.authService.getAccessToken();
    // headers = headers.append('x-access-token',token);

    return this.http.get<any>(this.endpoint.host+this.endpoint.seatsData+"/"+id)
  }

}
