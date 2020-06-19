import { Component, OnInit, Inject } from '@angular/core';
import { IPost } from '../../interfaces/post.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IDialogData } from '../../interfaces/dialog.interface';
import { PostStoreService } from '../../services/post-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  public posts$: Observable<IPost>;
  public form: FormGroup;
  public status: string;
  public statusCheck: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    public dialogRef: MatDialogRef<PopupComponent>,
    private postStore: PostStoreService,
  ) {}

  ngOnInit() {
    const { status } = this.data;

    this.status = status;
    this.statusCheck = status === 'edit';

    this.initForm();
  }

  addPost(): void {
    const localPost: IPost = this.form.value;

    this.postStore.addPost(localPost);

    this.closeDialog();
  }

  updatePost(): void {
    const localPost: IPost = this.form.value;

    this.postStore.updatePost(localPost);

    this.closeDialog();
  }

  submit(): void {
    if (this.statusCheck) {
      this.updatePost();
      return;
    }

    this.addPost();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  initForm(): void {
    const { post } = this.data;
    const posts = this.postStore.getCurrentPosts();

    const id = this.statusCheck ? post.id : (posts[posts.length - 1].id + 1);
    const title = this.statusCheck ? post.title : '';
    const img = this.statusCheck ? post.img : '';

    this.form = new FormGroup({
      id: new FormControl(id, Validators.required),
      title: new FormControl(title, Validators.required),
      img: new FormControl(img, Validators.required)
    });
  }

}
