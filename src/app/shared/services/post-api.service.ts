import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/post.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToasterService } from './toaster.service';
import { tap } from 'rxjs/internal/operators/tap';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostApiService {
  public API = environment.api;

  public headers = {
    'Content-Type': 'application/json'
  };

  constructor(
    private http: HttpClient,
    private toastService: ToasterService
  ) { }

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${this.API}/posts`);
  }

  addPost(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(`${this.API}/posts/`, post, { headers: this.headers })
      .pipe(
        tap(() => this.toastService.openSnackBar(`Post '${post.title}' added`, 'ADD NEW POST'))
      );
  }

  deletePost(post: IPost): Observable<IPost> {
    return this.http.delete<IPost>(`${this.API}/posts/${post.id}`)
      .pipe(
        tap(() => this.toastService.openSnackBar(`Post '${post.title}' deleted`, 'DELETE POST'))
      );
  }

  updatePost(post: IPost): Observable<IPost> {
    return this.http.patch<IPost>(`${this.API}/posts/${post.id}`, post, { headers: this.headers })
      .pipe(
        tap(() => this.toastService.openSnackBar(`Post '${post.title}' update`, 'UPDATE POST'))
      );
  }

}
