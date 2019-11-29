import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubordinateTasksComponent} from "./subordinate-tasks/subordinate-tasks.component";
import {ManagerTasksComponent} from "./manager-tasks/manager-tasks.component";
import {RegistrationComponent} from "./registration/registration.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {ManagerGuardService} from "./services/manager-guard.service";
import {SubordinateGuardService} from "./services/subordinate-guard.service";
import {RegisterGuardService} from "./services/register-guard.service";
import {LoginGuardService} from "./services/login-guard.service";

const routes: Routes = [
  { path: '', component: RegistrationComponent, canActivate:[RegisterGuardService]},
  { path: 'subordinate', component: SubordinateTasksComponent, canActivate:[SubordinateGuardService]},
  { path: 'manager', component: ManagerTasksComponent, canActivate:[ManagerGuardService]},
  { path: 'login', component: LoginComponent, canActivate:[LoginGuardService]},
  { path: 'logout', component: LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
