import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'; 

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    socket;
    constructor() {
        this.socket = io.connect();
        this.socket.on('connect', ()=>{
            console.log('connectd to server');
        });
        this.socket.emit('new message', 'hey'); //create emit and event
    }
}