import { Post } from './post.model';
import { Subject} from 'rxjs';
import { HttpClient } from  "@angular/common/http"
import { Injectable } from '@angular/core';

import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private http: HttpClient, private router: Router) {}

  getPosts(){
    this.http.get< { message: string, posts: Post[]} >('http://localhost:3000/api/posts')
    .subscribe((postData) => {
      this.posts = postData.posts;
      this.postsUpdated.next([...this.posts]);
    }) 
    //return [...this.posts];
  }

  getPostupdateListner(){
    return this.postsUpdated.asObservable();
  }

  getPost(id: string){
    return{...this.posts.find(p => p._id == id)};
  }

  addPost(title: string, content: string){
    const post: Post = {  _id: null, title:title, content: content};
    this.http
    .post<{ message: string, postId: string }>("http://localhost:3000/api/posts", post)
    .subscribe(responseData => {
      const Id = responseData.postId;
      post._id = Id;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    })
  }

  updatePost(id: string, title: string, content: string){
    const post: Post = {_id: id, title:title, content:content}
    this.http.put("http://localhost:3000/api/posts/" + id, post)
    .subscribe(response=> console.log(response));
    this.router.navigate(["/"]);
  }
  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/api/posts/" + postId)
    .subscribe(()=> {
      const updatedPosts = this.posts.filter(post => post._id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    })
  }

}
