import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

// This component is for administration and testing!
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessageService) {}

  ngOnInit() {
  }

}
