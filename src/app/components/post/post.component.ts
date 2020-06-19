import { Component, OnInit, Input } from '@angular/core';
import { IPost } from 'src/app/shared/interfaces/post.interface';
import { MatDialog } from '@angular/material';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { PostStoreService } from 'src/app/shared/services/post-store.service';

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
    public dialog: MatDialog,
    public postStore: PostStoreService
  ) { }

  ngOnInit() {
  }

  onDeletePost(post: IPost): void {
    this.postStore.deletePost(post);
  }

  onEditPost(post: IPost): void {
    this.dialog.open(PopupComponent, {
      data: { status: 'edit', post }
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
