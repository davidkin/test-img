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
  private API = environment.api;
  private headers = {
    'Content-Type': 'application/json'
  };

  constructor(
    private http: HttpClient,
    private toastService: ToasterService
  ) { }

  getAllPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${this.API}/posts`);
  }

  addPost(newPost: IPost): Observable<IPost> {
    return this.http.post<IPost>(`${this.API}/posts/`, newPost, { headers: this.headers })
      .pipe(
        tap(() => this.toastService.openSnackBar(`Post '${newPost.title}' added`, 'ADD NEW POST'))
      );
  }

  deletePost(deletePost: IPost): Observable<IPost> {
    return this.http.delete<IPost>(`${this.API}/posts/${deletePost.id}`)
      .pipe(
        tap(() => this.toastService.openSnackBar(`Post '${deletePost.title}' deleted`, 'DELETE POST'))
      );
  }

  updatePost(updatedPost: IPost): Observable<IPost> {
    return this.http.put<IPost>(`${this.API}/posts/${updatedPost.id}`, updatedPost, { headers: this.headers })
      .pipe(
        tap(() => this.toastService.openSnackBar(`Post '${updatedPost.title}' update`, 'UPDATE POST'))
      );
  }

}
