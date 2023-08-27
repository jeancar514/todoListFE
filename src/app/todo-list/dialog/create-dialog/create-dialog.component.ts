import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../models/task';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent {
  formGroup: FormGroup;
  task!: Task;
  minDate:Date = new Date();

  constructor(
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
  ) {
    this.formGroup = new FormGroup({
      description: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
    })
  }

  ngOnInit() {
    this.dayMonthYear()
  }

  dayMonthYear(){
    this._locale = 'fr';
    this._adapter.setLocale(this._locale);
  }

  save() {
    if(this.formGroup.controls['description'].value !== "" && this.formGroup.controls['description'].value !== null ){
      let task:Task = {
        description: this.formGroup.controls['description'].value,
        date: this.formGroup.controls['date'].value,
        completed:false,
      }
      this.dialogRef.close({task: task});
    }
  }

  cancel() {
    this.dialogRef.close({task: null});
  }

}
