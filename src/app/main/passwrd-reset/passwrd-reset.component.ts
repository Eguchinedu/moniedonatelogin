import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  visible2: boolean = true;
  changeType2: boolean = true;
  postError = false;
  postErrorMessage = '';

  resetForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {
    this.resetForm = new FormGroup(
      {
        email: new FormControl(null, [Validators.required, Validators.email]),
        code: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required]),
        confirmPassword: new FormControl(null, [Validators.required]),
      },
      {
        validators: this.MustMatch,
      }
    );
  }
  ngOnInit() {}
  viewPass() {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }
  viewPass2() {
    this.visible2 = !this.visible2;
    this.changeType2 = !this.changeType2;
  }

  get f() {
    return this.resetForm.controls;
  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }
  MustMatch: ValidatorFn = (control: AbstractControl):ValidationErrors | null => {

    let password = control.get('password')
    let confirmPassword = control.get('confirmPassword');

    if (
     password && confirmPassword &&
      password?.value !== confirmPassword?.value
    ) {

      return { passwordmatcherror: true };
    }
    return null;
  }
  
  onSubmit() {
    if (this.resetForm.valid) {
      this.auth.resetPassword(this.resetForm.getRawValue()).subscribe((result) => {
        if (result.success == true) {
          this.toastr.success('Password reset successfully', 'Success!');
          this.router.navigate(['/login']);
        } else {
          this.toastr.error(result.errorReason, 'Error!');
        }
      });
    } else if (
      this.resetForm.value.email == null ||
      (this.resetForm.value.email == '' &&
        this.resetForm.value.password == null) ||
      (this.resetForm.value.password == '' &&
        this.resetForm.value.code == null) ||
      (this.resetForm.value.code == '' &&
        this.resetForm.value.confirmPassword == null) ||
      this.resetForm.value.confirmPassword == ''
    ) {
      this.toastr.error('Input fields cannot be empty', 'Error!');
    } else if (
      this.resetForm.value.email == null ||
      this.resetForm.value.email == ''
    ) {
      this.toastr.error('Please input your email', 'Error!');
    } else if (
      this.resetForm.value.password == null ||
      this.resetForm.value.password == ''
    ) {
      this.toastr.error('Please input your password', 'Error!');
    } else if (
      this.resetForm.value.code == null ||
      this.resetForm.value.code == ''
    ) {
      this.toastr.error('Six digits code is required', 'Error!');
    } else if (
      this.resetForm.value.confirmPassword == null ||
      this.resetForm.value.confirmPassword == ''
    ) {
      this.toastr.error('Please confirm your password', 'Error!');
    } else {
      this.toastr.error('Invalid credentials', 'Error!');
    }
  }
}
