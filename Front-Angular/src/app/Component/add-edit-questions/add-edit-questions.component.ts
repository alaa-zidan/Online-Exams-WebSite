import { ChoiceService } from './../../Services/Choices/choice.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { QuestionsServiceService } from 'src/app/Services/Question_Service/questions-service.service';

import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';
import { ShardeSeviceService } from 'src/app/Services/Sharded/sharde-sevice.service';

@Component({
  selector: 'app-add-edit-questions',
  templateUrl: './add-edit-questions.component.html',
  styleUrls: ['./add-edit-questions.component.css'],
})
export class AddEditQuestionsComponent implements OnInit {
  // prop
  questionId: any;
  question: any;
  choices: any;
  newChoice: any;
  filteredChoices: any;
  // reactive forms
  QuestionsForm = new FormGroup({
    qname: new FormControl('', [Validators.required, Validators.minLength(10)]),
    addChoiceInput: new FormControl('', [Validators.minLength(3)]),
    correctAnswer: new FormControl('', [Validators.required]),
  });

  // ctor
  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private questionService: QuestionsServiceService,
    private ChoiceService: ChoiceService,
    private sharedexamId: ShardeSeviceService
  )
  {

  window.scrollTo({ top: 0, behavior: 'smooth' });

  }

  // on init
  ngOnInit(): void {
    this.filteredChoices = [];
    this.choices = [];
    this.activatedRoute.params.subscribe((params: Params) => {
      this.questionId = params['id'];

      if (this.questionId != 0) {
        this.questionService.getQuestionById(this.questionId).subscribe({
          next: (res) => {
            this.question = res;
            this.getQuestionName.setValue(this.question.text);
            this.getCorrectAnswer.setValue(this.question.correctAnswer);

            this.ChoiceService.GetQuestionsChoicesById(
              this.questionId
            ).subscribe({
              next: (result) => {
                this.choices = result;
                this.filteredChoices = result;
              },
              error: (er) => {
                console.log(er);
              },
            });
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {

        this.question = {
          id: 0,
          text: '',
          correctAnswer: '',
          isDeleted: false,
          exameID: this.sharedexamId.getData(),
          choices: [],
        };

      }
    });
  }

  // get form controls
  get getQuestionName() {
    return this.QuestionsForm.controls.qname;
  }
  get getaddChoiceInput() {
    return this.QuestionsForm.controls.addChoiceInput;
  }

  get getCorrectAnswer() {
    return this.QuestionsForm.controls.correctAnswer;
  }

  // edit fun
  Edit(choice: any, index: any) {

    this.choices[index].text = choice.value;
  }

  Submit(e: any) {
    if (this.QuestionsForm.controls.correctAnswer.value == '') {
      Swal.fire({
        title: 'Must Select Correct First',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      });
    }
    e.preventDefault();
    if (this.QuestionsForm.valid) {
      (async () => {
        if (this.questionId == 0) {

          this.question.id = 0;
          this.question.text = this.getQuestionName.value;
          this.question.correctAnswer = this.getCorrectAnswer.value;
          this.question.choices = this.choices.filter(
            (choice: any) => !choice.isDeleted
          );

          await firstValueFrom(this.questionService.AddQuestion(this.question));


        } else {
          if (this.QuestionsForm.controls.correctAnswer.value == null) {
            alert('Please select Correct choice first');
          }

          this.question.text = this.QuestionsForm.controls.qname.value;
          this.question.correctAnswer =
            this.QuestionsForm.controls.correctAnswer.value;

          await firstValueFrom(
            this.questionService.EditQuestion(this.question)
          );

          for (let i = 0; i < this.choices.length; i++) {
            if (this.choices[i].id == 0) {
              await this.ChoiceService.AddChoice(this.choices[i]).toPromise();
            } else {
              await firstValueFrom(
                this.ChoiceService.EditChoice(this.choices[i])
              );
            }
          }
        }
        Swal.fire({
          icon: 'success',
          title: 'Your Question has been added',
          showConfirmButton: false,
          timer: 1500,
        });
        this.route.navigate(['/Questions', this.question.exameID]);
      })();
    }
  }

  // delete fun
  Delete(index: number): void {

    if (this.choices[index].text == this.getCorrectAnswer.value) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Select the correct answer before deleting!',
      });
    } else {
      Swal.fire({
        title: 'Are you sure you want to delete this Choice?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          this.removeDeletedChoice(index);
          Swal.fire('Deleted!', 'Your Question has been deleted.', 'success');
        }
      });
    }
  }

  removeDeletedChoice(index: number): void {

    this.filteredChoices = [];
    this.choices[index].isDeleted = true;
    for (let index = 0; index < this.choices.length; index++) {
      if (this.choices[index].isDeleted == false) {
        this.filteredChoices.push(this.choices[index]);
      }
    }
  }

  // add choice fun
  AddChoice() {
    this.newChoice = this.getaddChoiceInput.value;

    let choice: {
      id: number;
      text: string;
      questionId: number;
      isDeleted: boolean;
    } = {
      id: 0,
      text: this.newChoice,
      questionId: this.questionId,
      isDeleted: false,
    };
    this.choices.push(choice);
    this.getaddChoiceInput.setValue('');

    this.filteredChoices = [];
    for (let index = 0; index < this.choices.length; index++) {
      if (this.choices[index].isDeleted == false) {
        this.filteredChoices.push(this.choices[index]);
      }
    }
  }
}
