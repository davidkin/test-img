import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/post.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../config';
import { ToasterService } from './toaster.service';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class PostApiService {

  constructor(
    private http: HttpClient,
    private toastService: ToasterService
  ) { }

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${API}/posts`);
  }

  addPost(post: IPost) {
    return this.http.post(`${API}/posts/`, post)
      .pipe(
        tap(() => this.toastService.openSnackBar(`Post '${post.title}' added`, 'ADD NEW POST'))
      );
  }

  deletePost(post: IPost): Observable<IPost> {
    return this.http.delete<IPost>(`${API}/heroes/${post.id}`)
      .pipe(
        tap(() => this.toastService.openSnackBar(`Post '${post.id}' deleted`, 'DELETE POST'))
      );
  }

  updatePost(post: IPost): Observable<IPost> {
    return this.http.put<IPost>(`${API}/heroes/${post.id}`, post)
      .pipe(
        tap(() => this.toastService.openSnackBar(`Post '${post.title}' deleted`, 'DELETE POST'))
      );
  }

}
