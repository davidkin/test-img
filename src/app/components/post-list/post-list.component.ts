import { Component, OnInit, Input } from '@angular/core';
import { IPost } from 'src/app/shared/interfaces/post.interface';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {
  @Input() posts: IPost[];

  constructor() { }

}
