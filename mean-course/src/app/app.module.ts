import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PostCreateComponent } from './posts/post-create/post-create.component'

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
