import { Injectable } from '@angular/core';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Task } from '../models/task';
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog
    ) {}

  public createTaskDialog(width: string, height: string): Observable<Task> {
    let dialogRef: MatDialogRef<CreateDialogComponent>;
    dialogRef = this.dialog.open(CreateDialogComponent, {
        height: height, width: width, data: {

        }, autoFocus: false
    });
    return dialogRef.afterClosed();
  }


}
