import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExampAttempServiceService {

  baseURL: string = `${environment.apiUrl}/ExamAttempt`;
  constructor( private http : HttpClient ){}

  AddExamAttemp(ExamAttempt : any)
  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(ExamAttempt);

    return this.http.post(this.baseURL,ExamAttempt, { headers } );
  }

  GetAllByUserID(UserId : number)
  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseURL}/${UserId}`, { headers });
  }
}

