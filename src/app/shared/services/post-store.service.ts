import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/post.interface';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { PostApiService } from './post-api.service';
import { Post } from '../models/Post';
import { Observable } from 'rxjs';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class PostStoreService {
  // tslint:disable-next-line: variable-name
  private _posts: BehaviorSubject<IPost[]> = new BehaviorSubject([]);
  public readonly posts: Observable<IPost[]> = this._posts.asObservable();

  constructor(
    private postApi: PostApiService,
    private toast: ToasterService
  ) {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.postApi.getAllPosts()
      .subscribe(
        (res: IPost[]) => {
          const posts = res.map( (post: IPost) => new Post({ id: post.id, title: post.title, img: post.img }) );
          this._posts.next(posts);
        },
        err => this.toast.openSnackBar(`Error retrieving Posts: ${err}`, 'LOAD ERROR')
      );
  }

  addPost(newPost: IPost): Observable<IPost> {
    const postAddReq$ = this.postApi.addPost(newPost);

    return postAddReq$;
  }

  deletePost(deletedPost: IPost): Observable<IPost> {
    const postDeleteReq$: Observable<IPost> = this.postApi.deletePost(deletedPost);

    postDeleteReq$.subscribe(
      () => {
        const posts: IPost[] = this._posts.getValue();
        const newPosts = posts.filter(el => el.id !== deletedPost.id);

        this._posts.next(newPosts);
      },
      err => this.toast.openSnackBar(`Error delete Post: ${err}`, 'DELETE POST ERROR')
    );

    return postDeleteReq$;
  }
}
