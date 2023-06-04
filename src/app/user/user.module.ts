import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
      // { path: 'products/watch', component: SingleProductComponent },
    ]),
  ],
})
export class UserModule {}
