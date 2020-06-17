import { Component, OnInit } from '@angular/core';
import { PostApiService } from 'src/app/shared/services/post-api.service';
import { IPost } from 'src/app/shared/interfaces/post.interface';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { MatDialog } from '@angular/material';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-posts-main',
  templateUrl: './posts-main.component.html',
  styleUrls: ['./posts-main.component.scss']
})
export class PostsMainComponent implements OnInit {
  public posts: IPost[];
  // public selectedPost: IPost;

  constructor(
    private postApi: PostApiService,
    private toastService: ToasterService,
    public dialog: MatDialog,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.sharedService.currentPost.subscribe(posts => this.posts = posts);
    this.getPosts();
  }

  getPosts(): void {
    this.postApi.getPosts().subscribe(
      (data: IPost[] ) => (this.posts = data),
      err => this.toastService.openSnackBar(`The ${err}`, 'ERROR')
    );
  }

  addPost(): void {
    this.sharedService.currentPost.subscribe(posts => {
      this.posts = posts;
    });
  }

  // onSelectedPost(post: IPost) {
  //   this.selectedPost = post;
  // }

  openDialog(): void {
    this.dialog.open(PopupComponent, {
      data: {
        posts: this.posts
      }
    });
  }

}
