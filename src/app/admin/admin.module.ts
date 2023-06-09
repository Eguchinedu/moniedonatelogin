import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../guard/auth.guard';
import { MaterialModule } from '../material.module';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { AdminDonationsComponent } from './admin-donations/admin-donations.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';



@NgModule({
  declarations: [AdminComponent, AdminUsersComponent, CreateUserComponent, AdminDonationsComponent, DeleteUserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild([
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
      {
        path: 'admin/admin-users',
        component: AdminUsersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'admin/admin-donations',
        component: AdminDonationsComponent,
        canActivate: [AuthGuard],
      },
    ]),
  ],
  providers: [
    
  ],
  entryComponents: [CreateUserComponent, DeleteUserComponent],
})
export class AdminModule {}
