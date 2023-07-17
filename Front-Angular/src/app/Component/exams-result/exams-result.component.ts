import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/Auth/authentication.service';
import { ExampAttempServiceService } from 'src/app/Services/ExamAttemp/examp-attemp-service.service';

@Component({
  selector: 'app-exams-result',
  templateUrl: './exams-result.component.html',
  styleUrls: ['./exams-result.component.css']
})

export class ExamsResultComponent implements OnInit {
ExamAttemp:any;
userId : number;
constructor(private examAttemptService : ExampAttempServiceService, private auth: AuthenticationService,) {

  window.scrollTo({ top: 0, behavior: 'smooth' });
}
  ngOnInit(): void {
    this.auth.decodedToken();
    this.userId = this.auth.getIdFromToken();

    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.examAttemptService.GetAllByUserID(this.userId).subscribe({
      next : (result)=>{this.ExamAttemp=result;

      },
      error : (err)=>console.log(err)
    });

  }


}
