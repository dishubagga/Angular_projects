import { Post } from './post.model';
import { Subject} from 'rxjs';
import { HttpClient } from  "@angular/common/http"
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private http: HttpClient) {}

  getPosts(){
    this.http.get< { message: string, posts: any} >('http://localhost:3000/api/posts')
    .pipe(map(( postData )=> {
      return postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        }
      });
    }))
    .subscribe(( transformedPosts ) => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    }) 
    //return [...this.posts];
  }

  getPostupdateListner(){
    return this.postsUpdated.asObservable();
  }
  addPost(title: string, content: string){
    const post: Post = {  title:title, content: content};
    this.http.post<{ message: string }>("http://localhost:3000/api/posts", post)
    .subscribe(responseData => {
    
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);

    })
  }
  deletePost(postId: string){
    this.http.delete("http://localhost:3000/api/posts/" + postId)
    .subscribe(()=> {
      console.log("In delete post");
    });
  }

}