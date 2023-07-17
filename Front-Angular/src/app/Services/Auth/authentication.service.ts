import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import { HttpClient}from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private userPayload:any;
  constructor(private http: HttpClient) {
    this.userPayload = this.decodedToken();
   }


  login(signDTO: any) {
    return this.http.post<any>(`${environment.apiUrl}/Auth/login`, signDTO,
    );
  }
register(registerDTO: any) {
  return this.http.post<any>(`${environment.apiUrl}/Auth/register`, registerDTO);
}
storeToken(tokenValue: string){
  localStorage.setItem('token', tokenValue)
}
getToken(){
  return localStorage.getItem('token')
}
isLoggedIn(): boolean {
  const token = localStorage.getItem('token');
  return token !== null;
}
logout() {
  localStorage.removeItem('token');
}
decodedToken(){
  const jwtHelper = new JwtHelperService();
  const token = this.getToken()!;
  this.userPayload=jwtHelper.decodeToken(token)
  return this.userPayload
}
getIdFromToken(){
  if(this.userPayload)
  return this.userPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
}
getNameFromToken(){
  if(this.userPayload)
  return this.userPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
}

getRoleFromToken(){
  if(this.userPayload)
  return this.userPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
}
}
