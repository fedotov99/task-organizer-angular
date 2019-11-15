import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { ManagersComponent } from './managers/managers.component';
import { SubordinatesComponent } from './subordinates/subordinates.component';
import { MessagesComponent } from './messages/messages.component';
import {TaskService} from './services/task.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    ManagersComponent,
    SubordinatesComponent,
    MessagesComponent
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
    MatIconModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
