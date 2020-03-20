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
  chats = [
    'Hello',
    'How are you',
    'Im good, what abou you?'
   
  ];
  constructor(message: MessageService){}
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
}
