import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/shared/interfaces/post.interface';
import { MatDialog } from '@angular/material';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { PostStoreService } from 'src/app/shared/services/post-store.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-posts-main',
  templateUrl: './posts-main.component.html',
  styleUrls: ['./posts-main.component.scss']
})
export class PostsMainComponent implements OnInit {
  public posts$: Observable<IPost[]>;

  constructor(
    public dialog: MatDialog,
    private postStore: PostStoreService
  ) { }

  ngOnInit(): void {
    this.posts$ = this.postStore.posts;
  }

  openDialog(): void {
    this.dialog.open(PopupComponent, {
      data: {
        status: 'add'
      }
    });
  }
}
