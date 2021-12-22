import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiendpointService {

  constructor() { }
  public host = environment.baseUrl;
  public register = '/api/auth/signup';
  public login = '/api/auth/signin';
  public requestResetPassword = '/api/auth/requestResetPassword';
  public verifyAccessToken = '/api/auth/verifyAccessToken';
  public userLogout = '/api/auth/logout';
  public userLoginDetails = '/api/user/userLoginInfo';
  public userPreLoginDetails = '/api/user/userPreLoginInfo';
  public userReAuth = '/api/auth/refresh-token';

  public seatsData = '/getSeatsData'
  
}
