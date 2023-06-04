import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import  { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './admin/admin.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { UserModule } from './user/user.module';
import { MaterialModule } from './material.module';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { CreateUserComponent } from './admin/create-user/create-user.component';

@NgModule({
  declarations: [AppComponent, SidenavComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MaterialModule,
    AdminModule,
    UserModule,
    AppRoutingModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi: true}
  ],
  entryComponents: [CreateUserComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
