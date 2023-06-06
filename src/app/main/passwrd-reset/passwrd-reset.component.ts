import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { IReset } from 'src/app/types/reset-pass';

@Component({
  selector: 'app-passwrd-reset',
  templateUrl: './passwrd-reset.component.html',
  styleUrls: ['./passwrd-reset.component.css'],
})
export class PasswrdResetComponent implements OnInit {
  visible: boolean = true;
  changeType: boolean = true;

  originalReset: IReset = {
    email: null,
    password: null,
    code: null,
  };
  reset: IReset = { ...this.originalReset };
  postError = false;
  postErrorMessage = '';

  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {}
  ngOnInit() {}
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
      this.auth.resetPassword(this.reset).subscribe((result) => {
        console.log('result', result);
        if (result.success == true) {
          this.toastr.success('Password reset successfully', 'Success!');
          this.router.navigate(['/login']);
          console.log(result);
        } else {
          this.toastr.error(result.errorReason, 'Error!');
        }
      });
    } else if (
      form.value.email == null ||
      (form.value.email == '' && form.value.password == null) ||
      form.value.password == ''
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
