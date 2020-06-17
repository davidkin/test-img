import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPost } from 'src/app/shared/interfaces/post.interface';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  @Input() posts: IPost[];

  public selectedPost: IPost;

  constructor() { }

  selectPost(post: IPost): void {
    this.selectedPost = post;
  }

}
