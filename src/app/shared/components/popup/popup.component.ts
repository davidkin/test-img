import { Component, OnInit, Inject } from '@angular/core';
import { IPost } from '../../interfaces/post.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IDialogData } from '../../interfaces/dialog.interface';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  public localPost: IPost;
  public form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    public dialogRef: MatDialogRef<PopupComponent>
  ) {}

  ngOnInit() {
    const { post } = this.data;
    const id = post.id + 1;

    this.initForm(id);
  }

  addHero() {
    this.localPost = this.form.value;

    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  initForm(id: number): void {
    this.form = new FormGroup({
      id: new FormControl(id, Validators.required),
      title: new FormControl('', Validators.required),
      img: new FormControl('', Validators.required)
    });
  }

}
