import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ILogin } from 'src/app/types/login';

@Component({
  selector: 'app-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.css'],
})
export class FormSectioncomponent implements OnInit {
  visible: boolean = true;
  changeType: boolean = true;

  originalLogin: ILogin = {
    email: null,
    password: null,
  };
  login: ILogin = { ...this.originalLogin };
  postError = false;
  postErrorMessage = '';

  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
  }

  viewPass() {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }
  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }
  onSubmit(form: NgForm) {
    console.log('in onSubmit: ', form.value);
    if (form.valid) {
      this.auth.login(this.login).subscribe((result) => {
        console.log('result', result);
        if (result.success == true && this.login.email === 'admin@imprinno.com') {
          this.toastr.success('Logged in as admin', 'Welcome!');
          this.auth.storeToken(result.token);
          this.router.navigate(['/admin']);
          console.log(result);
        } else if (result.success == true){
          this.toastr.success('Logged in as user', 'Welcome!');
          this.auth.storeToken(result.token);
          this.router.navigate(['/user']);
        } else {
          this.toastr.error(result.errorReason, 'Error!');

        }
      });
    } else if (
      form.value.email == null || form.value.email == '' 
      && 
      form.value.password == null || form.value.password == ''
    ) {
      this.toastr.error('Email or Password field cannot be empty', 'Error!');
    } else if (form.value.email == null || form.value.email == '') {
      this.toastr.error('Please input your email', 'Error!');
    } else if (form.value.password == null || form.value.password == '') {
      this.toastr.error('Please input your password', 'Error!');
    } else {
      this.toastr.error('Invalid credentials', 'Error!');
    }
  }
}
