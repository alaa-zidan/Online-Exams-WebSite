import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/Services/Auth/authentication.service';
import { CurrentUserService } from 'src/app/Services/User/current-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  error = '';
  submitted = false;
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,private authenticationService: AuthenticationService,
      private user: CurrentUserService
  ) {
      if (this.authenticationService.isLoggedIn()) {
          this.router.navigate(['/']);
      }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          email: ['',Validators.required],
          password: ['', Validators.required]
      });
  }
   // convenience getter for easy access to form fields
   get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;
      if (this.loginForm.invalid) {
          return;
      }

       this.authenticationService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.authenticationService.storeToken(res.accessToken);
          this.router.navigate(['/'])
        },
        error: (err) => {
          this.error=err.error;
        },
      });

  }
}
