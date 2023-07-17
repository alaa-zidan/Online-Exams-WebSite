import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {


  constructor() {
    window.scrollTo({ top: 0, behavior: 'smooth' });


  }

  contactUsForm = new FormGroup({
    name : new FormControl('',[Validators.required,Validators.minLength(3)]),
    email : new FormControl('',[Validators.required,Validators.email]),
    subject : new FormControl('',[Validators.required,Validators.minLength(3)]),
    message : new FormControl('',[Validators.required,Validators.minLength(10)])
  });

  get getName(){
    return this.contactUsForm.controls['name'];
  }


  get getEmail(){
    return this.contactUsForm.controls['email'];
  }


  get getSubject(){
    return this.contactUsForm.controls['subject'];
  }


  getMessage(){
    return this.contactUsForm.controls['message'];
  }

}
