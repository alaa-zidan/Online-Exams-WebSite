import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { QuestionsServiceService } from 'src/app/Services/Question_Service/questions-service.service';
import { ShardeSeviceService } from 'src/app/Services/Sharded/sharde-sevice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: []
})
export class QuestionsComponent implements OnInit
{
  examID : any  ;
  allQes : any ;
  constructor
  (
    private activatedRoute : ActivatedRoute ,
    private questionService : QuestionsServiceService ,
    private sharedExamId :ShardeSeviceService
  )
  {

  window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnInit(): void
  {

    console.log("on init questions");

    this.activatedRoute.params.subscribe((params : Params)=>{
      this.examID = params['id'];
      this.sharedExamId.setData(this.examID);
      console.log(this.sharedExamId.getData());

      this.questionService.GetExamQuestionsById(this.examID).subscribe({
        next : (res)=>{this.allQes = res;
        console.log("on init service quetions result ");
        console.log(res);

        },
        error : (err) =>{console.log(err)}
      });
    });


  }

  Delete( id : number) : void
  {
    Swal.fire({
      title: 'Are you sure you want to delete this Question?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.DeleteQuestion(id).subscribe({
          next : () =>
          {
            this.removeDeletedQestion(id);
          },
          error : (err)=>{ console.log(err)}
        });
        Swal.fire(
          'Deleted!',
          'Your Question has been deleted.',
          'success'
        )
      }
    })


  }

  removeDeletedQestion(id: number): void {
    this.allQes = this.allQes.filter((qes: any) => qes.id !== id);
  }


}
