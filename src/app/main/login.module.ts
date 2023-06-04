import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { HeroPhotoSectionComponent } from './login/Hero-photo-section/hero-photo-section.component';
import { FormSectioncomponent } from './login/form-section/form-section.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    HeroPhotoSectionComponent,
    FormSectioncomponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginModule {}
