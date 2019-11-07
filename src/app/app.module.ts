import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { ManagersComponent } from './managers/managers.component';
import { SubordinatesComponent } from './subordinates/subordinates.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    ManagersComponent,
    SubordinatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
