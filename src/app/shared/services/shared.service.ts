import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IPost } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public post = new BehaviorSubject<IPost[]>([]);
  public currentPost = this.post.asObservable();

  constructor() { }

  sendPost(posts: IPost[]) {
    this.post.next(posts);
  }

}
