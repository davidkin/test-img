import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { IPost } from '../../interfaces/post.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IDialogData } from '../../interfaces/dialog.interface';
import { SharedService } from '../../services/shared.service';
import { PostApiService } from '../../services/post-api.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  public form: FormGroup;
  public status: string;
  public statusCheck: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    public dialogRef: MatDialogRef<PopupComponent>,
    private sharedService: SharedService,
    private postApi: PostApiService
  ) {}

  ngOnInit() {
    const { status } = this.data;

    this.status = status;
    this.statusCheck = status === 'edit';

    this.initForm();
  }

  addPost() {
    const { posts } = this.data;
    const localPost: IPost = this.form.value;

    this.postApi.addPost(localPost).subscribe(
      (data: IPost) => {
        const newPosts: IPost[] = [...posts, data];
        this.sharedService.sendPosts(newPosts);
      }
    );

    this.closeDialog();
  }

  updatePost() {

  }

  submit() {
    if (this.statusCheck) {
      this.updatePost();
      return;
    }

    this.addPost();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  initForm(): void {
    const { posts, post } = this.data;

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
