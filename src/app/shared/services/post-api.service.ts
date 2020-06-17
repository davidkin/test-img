import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/post.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../config';

@Injectable({
  providedIn: 'root'
})
export class PostApiService {

  constructor(
    private http: HttpClient,
  ) { }

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${API}/posts`);
  }
}
