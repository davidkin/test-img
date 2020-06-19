import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/post.interface';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { PostApiService } from './post-api.service';
import { Post } from '../models/Post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostStoreService {
  // tslint:disable-next-line: variable-name
  private _posts: BehaviorSubject<IPost[]> = new BehaviorSubject([]);
  public readonly posts: Observable<IPost[]> = this._posts.asObservable();

  constructor(
    private postApi: PostApiService
  ) {
    this.loadInitialData();
  }

  loadInitialData() {
    this.postApi.getAllPosts()
      .subscribe(
        (res: IPost[]) => {
          const posts = res.map( (post: IPost) => new Post({ id: post.id, title: post.title, img: post.img }) );
          this._posts.next(posts);
        },
        err => console.log('Error retrieving Posts')
      );
  }
}
