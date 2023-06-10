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
    if (form.valid) {
      this.auth.createUser(this.createUser).subscribe((result) => {
        if (result.success == true) {
          this.closeDialog();
          this.toastr.success('User created successfully');
          this.loadUser();
        } else {
          this.toastr.error(result.errorReason, 'Error!');
        }
        
      });
    }
     else {
      this.toastr.error('Please input details', 'Error!');
    }
  }
}
