import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'; 
import { Subject } from 'rxjs'; // we are having array of chats wheneveer we add chat to array we want component to know about it so we imported subject



@Injectable({
    providedIn: 'root'
})
export class MessageService {
    _chats = [];
    _chatssub;
    socket;
    constructor() {
        this._chatssub = new Subject<any[]>();
        this.socket = io.connect();
        this.socket.on('connect', ()=>{
            console.log('connectd to server');
        });
        this.socket.on('message received', (data)=>{
            this._chats.push(data); 
            this._chatssub.next([...this._chats]);
        })
        this.socket.on('all messages', (data) =>{
            this._chats = [...data]; // this will pass array of data  to chats
            this._chatssub.next([...this._chats]); //this will add _chats to _chatssub
        })    

    }
    addChat(message){
        this.socket.emit('new message', message);
    }
    addUser(user){
        this.socket.emit('new user', user);
    }
    getChats(){
        return this._chatssub.asObservable();
    }
}