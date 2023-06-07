import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ICreateUser } from 'src/app/types/create-user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {


  originalCreateUser: ICreateUser = {
    firstName: null,
    lastName:null,
    username: null,
    email: null,
  };
  createUser: ICreateUser = { ...this.originalCreateUser };
  postError = false;
  postErrorMessage = '';

  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialogRef<CreateUserComponent>
  ) {}
  ngOnInit() {}

  loadUser() {
    this.auth.getUsers().subscribe((result) => {
      console.log(result);
      location.reload(); // refresh the page
       this.ngOnInit();
    });
  }
 
  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }
  closeDialog(){
    this.dialog.close();
  }
  onSubmit(form: NgForm) {
    console.log('in onSubmit: ', form.value);
    if (form.valid) {
      this.auth.createUser(this.createUser).subscribe((result) => {
        console.log('result', result);
        if (result.success == true) {
          this.closeDialog();
          this.toastr.success('User created successfully');
          this.loadUser();
        } else {
          this.toastr.error(result.errorReason, 'Error!');
        }
        
      });
    // } else if (
    //   form.value.email == null ||
    //   (form.value.email == '' && form.value.password == null) ||
    //   form.value.password == ''
    // ) {
    //   this.toastr.error('Email or Password field cannot be empty', 'Error!');
    // } else if (form.value.email == null || form.value.email == '') {
    //   this.toastr.error('Please input your email', 'Error!');
    // } else if (form.value.password == null || form.value.password == '') {
    //   this.toastr.error('Please input your password', 'Error!');
    }
     else {
      this.toastr.error('Please input details', 'Error!');
    }
  }
}
