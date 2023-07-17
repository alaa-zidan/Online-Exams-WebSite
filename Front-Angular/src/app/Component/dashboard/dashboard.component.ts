import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/Services/ExamService/exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Exams : any;

  constructor(private examService : ExamService)
  {

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnInit(): void
  {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.examService.getAllExams().subscribe({
      next : (result) => {this.Exams = result;console.log(result);
       },
      error : (err)=>{console.log(err);}
    });
  }

   Delete( id : number) : void
  {
    Swal.fire({
      title: 'Are you sure you want to delete this exam?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.examService.DeleteExam(id).subscribe({
          next : () =>
          {
            this.removeDeletedExam(id);
          },
          error : (err)=>{ console.log(err)}
        });
        Swal.fire(
          'Deleted!',
          'Your Exam has been deleted.',
          'success'
        )
      }
    })


  }

  removeDeletedExam(id: number): void {
    this.Exams = this.Exams.filter((exam: any) => exam.id !== id);
  }


}
