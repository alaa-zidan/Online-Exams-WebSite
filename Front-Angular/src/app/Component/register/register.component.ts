import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/Services/Auth/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {

    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/']);
    }

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      Password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_Password: ['', [Validators.required, Validators.minLength(8)]],
      agree: [false, Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.controls["Password"];
    const repassword = form.controls["confirm_Password"];

    if (password.value !== repassword.value) {
      repassword.setErrors({ passwordMismatch: true });

    }


  }



  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.authenticationService.register({ Name: this.f['name'].value, Email: this.f['email'].value, password: this.f['Password'].value })
      .subscribe({
        next: (res => {
          console.log(res.message);
          Swal.fire({
            icon: 'success',
            title: 'Welcome Dear.',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['/login']);
          this
        }),
        error: (err => {
          this.error = err?.error;
        })
      })

  }
}
