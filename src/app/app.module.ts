import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubordinateTasksComponent } from './subordinate-tasks/subordinate-tasks.component';
import { ManagersComponent } from './managers/managers.component';
import { SubordinatesComponent } from './subordinates/subordinates.component';
import { MessagesComponent } from './messages/messages.component';
import {TaskService} from './services/task.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from "@angular/material/stepper";
import { ManagerTasksComponent } from './manager-tasks/manager-tasks.component';
import {MatTabsModule} from "@angular/material/tabs";
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    AppComponent,
    SubordinateTasksComponent,
    ManagersComponent,
    SubordinatesComponent,
    MessagesComponent,
    ManagerTasksComponent,
    RegistrationComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatMenuModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
