import { ShardeSeviceService } from 'src/app/Services/Sharded/sharde-sevice.service';
import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { ExamService } from 'src/app/Services/ExamService/exam.service';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})



export class AddExamComponent implements OnInit{
  Exam:any;
  ExamId:any;
  addedExam : any;
  constructor
  (
    private examService : ExamService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private ShardeSevice : ShardeSeviceService
  )
  {
    window.scrollTo({ top: 0, behavior: 'smooth' });
      this.Exam= {
      id: 0,
      name : "" ,
      isDeleted: false
    };
  }
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.activatedRoute.params.subscribe((params : Params)=>{
      this.ExamId = params['id'];

      if(this.ExamId != 0){
        this.examService.getExamById(this.ExamId).subscribe(
          {
            next : (result)=>{
            this.Exam = result ;
            this.getExamName.setValue(this.Exam.name);
          },

            error : (error)=>{console.log(error);}
          }
        )


      }
  })
  }

  ExamAddForm = new FormGroup({
    ExamName: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  get getExamName()
  {
    return this.ExamAddForm.controls.ExamName;
  }

  Submit(e:any){
    e.preventDefault();
    this.Exam.name=this.getExamName.value;

    if(this.ExamAddForm.valid){
    if(this.ExamId == 0){
    (async () => {
      this.addedExam = await lastValueFrom (this.examService.AddExam(this.Exam));
      console.log(this.addedExam);
      this.ShardeSevice.setData(this.addedExam.id);
      this.router.navigate(['Add',0]);

      })();
    }else{
      (async () => {
        this.Exam.name=this.getExamName.value;
        console.log(this.Exam);

        let y=await lastValueFrom (this.examService.EditExamName(this.Exam));
        console.log(y);
        this.router.navigate(['Dashboard']);
        })();
    }

    }
  }
}
