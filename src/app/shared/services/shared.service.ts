import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPost } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public post = new BehaviorSubject<any>([]);
  public currentPosts = this.post.asObservable();

  constructor() { }

  sendPosts(posts: IPost[]) {
    this.post.next(posts);
  }

}
