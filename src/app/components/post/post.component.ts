import { Component, OnInit, Input } from '@angular/core';
import { IPost } from 'src/app/shared/interfaces/post.interface';
import { SharedService } from 'src/app/shared/services/shared.service';
import { PostApiService } from 'src/app/shared/services/post-api.service';
import { MatDialog } from '@angular/material';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: IPost;
  @Input() activePost: IPost;

  public isReverse: boolean;

  public colorText: string;
  public colorEdit: string;
  public colorDelete: string;

  constructor(
    private postApi: PostApiService,
    private sharedService: SharedService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  onDeletePost(post: IPost): void {
    // this.postApi.deletePost(post).subscribe(
    //   () => {
    //     const newPosts = this.posts.filter(el => el.id !== post.id);
    //     this.sharedService.sendPosts(newPosts);
    //   }
    // );
  }

  onEditPost(post: IPost): void {
    this.dialog.open(PopupComponent, {
      data: {
        status: 'edit'
      }
    });
  }

  changeColor() {
    this.colorText = this.getRandomColor();
    this.colorEdit = this.getRandomColor();
    this.colorDelete = this.getRandomColor();
  }

  getRandomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

}
