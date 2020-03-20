import { Component } from '@angular/core';
import { MessageService } from './message.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Epic Chat';
  message = '';
  chats = [];
  username;
  user;
  constructor(private messageService: MessageService){
    this.messageService.getChats().subscribe((data) => {
      this.chats  = data;
      window.setTimeout(() => {
        const elem      = document.getElementById('scrolldiv');
        elem.scrollTop  = elem.scrollHeight;
      }, 500);
    })
  }
  addChat() {
    if(this.message.length === 0){
      return
    }else {
      this.chats.push(this.message);
      this.message = '';

      window.setInterval(()=>{
        const elem =  document.getElementById('scrolldiv'); //this is used for scroll down 
        elem.scrollTop = elem.scrollHeight;
      }, 500)
      
    }   
  }
  addUser(user){
    this.messageService.addUser(user);
    this.username = user;
  }
}
