import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PostCreateComponent } from './posts/post-create/post-create.component'
import { PostListComponent } from './posts/post-list/post-list.component'
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule } from '@angular/material'
import { HeaderComponent } from './header/header.component';
@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    PostListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
