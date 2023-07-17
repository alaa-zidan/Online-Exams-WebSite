import { ExampAttempServiceService } from 'src/app/Services/ExamAttemp/examp-attemp-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QuestionsServiceService } from 'src/app/Services/Question_Service/questions-service.service';
import { AuthenticationService } from 'src/app/Services/Auth/authentication.service';

@Component({
  selector: 'app-exam-comp',
  templateUrl: './exam-comp.component.html',
  styleUrls: ['./exam-comp.component.css']
})
export class ExamCompComponent implements OnInit
{
  ExamId : any ;
  Questions : any;
  totalDegree : number = 0 ;
  currentQuestionIndex : number = 0;
  currentQuestion: any;
  result:any;
  showResult:boolean=false;
  ExamAttempt : any = {
    id :0,
    userID : 0,
    exameID : 0 ,
    score: 0,
    highScore: 0
  }

constructor(
  private activeRoute : ActivatedRoute ,
  private questionServices : QuestionsServiceService ,
  private examAttempt : ExampAttempServiceService,
  private auth: AuthenticationService,
  private route:Router
  )
{
  window.scrollTo({ top: 0, behavior: 'smooth' });

}

  ngOnInit(): void {
    this.auth.decodedToken();
    this.ExamAttempt.userID  = this.auth.getIdFromToken();
    this.activeRoute.params.subscribe((params:Params) =>
    {
      this.ExamId = params['id'];
      this.questionServices.GetExamQuestionsById(this.ExamId).subscribe({
        next : (result) =>
        {
          this.Questions = result;
          this.currentQuestion = this.Questions[this.currentQuestionIndex];
        },
        error : (err) => {console.log(err)}
      });
    });



  }
  calculateDegree() {
    this.totalDegree =0 ;
    for (const question of this.Questions) {
      if (question.selectedValue === question.correctAnswer)
      {
        this.totalDegree += 1;
      }
    }

    console.log(`Total Degree: ${this.totalDegree} / ${this.Questions.length}`);
    if(this.totalDegree<(this.Questions.length/2))
    this.result=false;
    else
    this.result=true;
    this.showResult=true;

    this.AddExamResult();
  }


  AddExamResult()
  {
    //this.ExamAttempt.userID =1 ; //need to be changed
    this.ExamAttempt.exameID = this.ExamId ;
    this.ExamAttempt.score = this.totalDegree;
    this.ExamAttempt.highScore = this.Questions.length;

    this.examAttempt.AddExamAttemp(this.ExamAttempt).subscribe({
      next:(res)=>{console.log(res)},
      error:(err)=>{console.log(err);}
    });
  }

  toggleSuccessMessage(){
    this.showResult= !this.showResult;
    this.route.navigate(['/grade'])
  }
  nextQuestion() {
    if (this.currentQuestionIndex < this.Questions.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.Questions[this.currentQuestionIndex];
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentQuestion = this.Questions[this.currentQuestionIndex];
    }
  }

}
