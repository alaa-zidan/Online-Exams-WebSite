import { Component ,OnInit } from '@angular/core';
import { ExamService } from 'src/app/Services/ExamService/exam.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-take-exame',
  templateUrl: './take-exame.component.html',
  styleUrls: ['./take-exame.component.css']
})
export class TakeExameComponent implements OnInit {
  Exams : any;
  constructor(private examService : ExamService)
  {

  }

  ngOnInit(): void
  {
    this.examService.getAllExams().subscribe({
      next : (result) => {this.Exams = result; },
      error : (err)=>{console.log(err);}
    });
  }
  }
