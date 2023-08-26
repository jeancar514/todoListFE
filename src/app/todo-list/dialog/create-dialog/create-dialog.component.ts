import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../models/task';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent {
  formGroup: FormGroup;
  task!: Task;

  constructor(
    public dialogRef: MatDialogRef<CreateDialogComponent>,
  ) {
    this.formGroup = new FormGroup({
      description: new FormControl('', Validators.required),
    })
  }

  ngOnInit() {

  }

  save() {
    if(this.formGroup.controls['description'].value !== "" && this.formGroup.controls['description'].value !== null ){
      let task:Task = {
        description: this.formGroup.controls['description'].value,
        date: new Date(),
        completed:false,
      }
      this.dialogRef.close({task: task});
    }
  }

  cancel() {
    this.dialogRef.close({task: null});
  }

}
