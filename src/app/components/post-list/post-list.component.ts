import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPost } from 'src/app/shared/interfaces/post.interface';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  @Input() posts: IPost[];
  @Input() selectedPost: IPost;

  @Output() selected = new EventEmitter<IPost>();

  constructor() { }

  selectPost(post: IPost): void {
    // this.selected.emit(post);
    this.selectedPost = post;
  }

}
