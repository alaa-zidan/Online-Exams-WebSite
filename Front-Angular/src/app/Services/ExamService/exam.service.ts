import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  baseURL : string = `${environment.apiUrl}/Exam`;
  constructor( private http : HttpClient )
  {

  }
  getAllExams()
  {
    const token = localStorage.getItem('token');
    console.log(token);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(headers);

    return this.http.get(this.baseURL, { headers });
  }

  getExamById(id : number)
  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseURL}/${id}`, { headers });
  }

  AddExam(exam : any)
  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseURL, exam, { headers });
  }

  DeleteExam(id : any)
  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseURL}/${id}`, { headers });
  }
  EditExamName(Exam : any)
  {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(this.baseURL, Exam , { headers });
  }
}
