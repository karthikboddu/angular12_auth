import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';import { BrowserModule } from '@angular/platform-browser';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContainerComponent } from './components/layouts/container/container.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderItemsComponent } from './components/header/header-items/header-items.component';
import { LogoComponent } from './components/header/logo/logo.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './auth.guard';
import { AuthenticateService } from './services/authenticate.service';
import { RepoListComponent } from './components/repo-list/repo-list.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { SeatsComponent } from './components/seats/seats.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    HomeComponent,
    LoginComponent,
    HeaderItemsComponent,
    LogoComponent,
    RegisterComponent,
    RepoListComponent,
    ProfileComponent,
    SeatsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,FormsModule,ReactiveFormsModule,HttpClientModule,RecaptchaModule,  //this is the recaptcha main module
    RecaptchaFormsModule,
  ],
  providers: [AuthGuard,AuthenticateService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA]
})
export class AppModule { }
