import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from "../auth.service";
@Component ({
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    isLoading= false; 
    constructor(public authService: AuthService){}
    onSignup( form: NgForm){
        console.log("on sign up")
        if(form.invalid){
            console.log("form invalid")
            return;
        }
        else{ 
            this.authService.createUser(form.value.email, form.value.password);
            }
        }
}