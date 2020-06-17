import { Component, OnInit, Input } from '@angular/core';
import { IPost } from 'src/app/shared/interfaces/post.interface';
import { SharedService } from 'src/app/shared/services/shared.service';
import { PostApiService } from 'src/app/shared/services/post-api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() posts: IPost[];
  @Input() post: IPost;
  @Input() activePost: IPost;

  constructor(
    private postApi: PostApiService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
  }

  onDeletePost(post: IPost): void {
    this.postApi.deletePost(post).subscribe(
      () => {
        const newPosts = this.posts.filter(el => el.id !== post.id);
        this.sharedService.sendPosts(newPosts);
      }
    );
  }

}
