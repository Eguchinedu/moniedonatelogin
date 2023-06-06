import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './main/login.component';
import { LoginModule } from './main/login.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { PasswrdResetComponent } from './main/passwrd-reset/passwrd-reset.component';

const routes: Routes = [
  {path: 'login/pass-reset', component: PasswrdResetComponent},
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [LoginModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
