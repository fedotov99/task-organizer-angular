import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './managers/users.component';
import { TasksComponent } from './tasks/tasks.component';
import { ManagersComponent } from './managers/managers.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    TasksComponent,
    ManagersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
