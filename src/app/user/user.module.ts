import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { MaterialModule } from '../material.module';
import { UserUsersComponent } from './user-users/user-users.component';
import { UserDonationsComponent } from './user-donations/user-donations.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [UserComponent, UserUsersComponent, UserDonationsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild([
      { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
      {
        path: 'user/user-users',
        component: UserUsersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user/user-donations',
        component: UserDonationsComponent,
        canActivate: [AuthGuard],
      },
    ]),
  ],
})
export class UserModule {}
