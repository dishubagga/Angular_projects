import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    intercept( req: HttpRequest<any>, next: HttpHandler){
        
        return next.handle(req);
    }
}