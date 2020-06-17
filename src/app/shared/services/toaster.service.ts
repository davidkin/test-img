import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(public snackBar: MatSnackBar) {}

  openSnackBar(msg: string, action: string) {
    this.snackBar.open(msg, action, { duration: 2000});
  }
}
