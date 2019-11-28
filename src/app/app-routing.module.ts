import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubordinateTasksComponent} from "./subordinate-tasks/subordinate-tasks.component";
import {ManagerTasksComponent} from "./manager-tasks/manager-tasks.component";
import {RegistrationComponent} from "./registration/registration.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";

const routes: Routes = [
  { path: '', component: RegistrationComponent},
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent },
  { path: 'subordinate', component: SubordinateTasksComponent},
  { path: 'manager', component: ManagerTasksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
