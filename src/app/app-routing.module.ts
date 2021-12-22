import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ContainerComponent } from './components/layouts/container/container.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SeatsComponent } from './components/seats/seats.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'register' },
  {
    path: 'home',
    component: ContainerComponent,
    data: {
      title: ('Home'),
      pageName: 'home',
      
    },
    canActivate:[AuthGuard]
  },
    {
    path: 'login',
    component: ContainerComponent,
    data: {
      title: ('login'),
      pageName: 'login'
    }
  },
  {
    path: 'register',
    component: ContainerComponent,
    data: {
      title: ('register'),
      pageName: 'register'
    }
  },
  {
    path: 'seat-booking',
    component: SeatsComponent,
    data: {
      title: ('seats'),
      pageName: 'seats'
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: ('seats'),
      pageName: 'seats'
    }
  },
  {
    path: 'profile',
    component: ContainerComponent,
    data: {
      title: ('profile'),
      pageName: 'profile',
      
    },
    canActivate:[AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
