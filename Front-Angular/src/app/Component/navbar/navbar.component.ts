import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/Auth/authentication.service';
import { ExamService } from 'src/app/Services/ExamService/exam.service';
import { CurrentUserService } from 'src/app/Services/User/current-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit
{
  Exams : any ;
  Username:string;
  Role:string;
  constructor(
    private ExamServices : ExamService,
    private auth: AuthenticationService,
    private router: Router) {
  }

  ngOnInit(): void
  {
    this.auth.decodedToken();
    this.Role = this.auth.getRoleFromToken();
    this.Username = this.auth.getNameFromToken();
  }
  isLoggedIn(): boolean {
    this.auth.decodedToken();
    this.Role = this.auth.getRoleFromToken();
    this.Username = this.auth.getNameFromToken();
    return this.auth.isLoggedIn();

  }

  isAdmin(): boolean {
    return this.Role === 'Admin';
  }


  logout(){
    this.auth.logout();
    this.router.navigate(['/login'])
    this.Username ="";
  }
}
