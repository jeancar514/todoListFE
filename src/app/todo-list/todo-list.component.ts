import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { RequestBodyComplete, Task } from './models/task';
import { FormControl, FormGroup } from '@angular/forms';
import { DialogService } from './dialog/dialog.service';



@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = ['task', 'date','actions'];
  dataSource = new MatTableDataSource<Task>();
  private onDestroy$: Subject<boolean> = new Subject();
  formGroup: FormGroup;
  tasks!: Task[];



  constructor(
    private todoListService: TodoListService,
    private dialogService: DialogService,
    ) {

      this.formGroup = new FormGroup({
        search:new FormControl('')
      })
    }

  ngOnInit(): void {
    this.getTaskall()

    this.formGroup.controls['search'].valueChanges
    .pipe(takeUntil(this.onDestroy$))
    .subscribe((searchData)=>{
      this.searchFilter(searchData)

    })
  }

  searchFilter(searchData:any){

    let filter = (searchData != "") ? this.tasks.filter(task => task.description.includes(searchData))  : this.tasks;
    this.dataSource = new MatTableDataSource<Task>(filter);
  }

  getTaskall(){
    this.todoListService.getTasks()
    .pipe(takeUntil(this.onDestroy$))
    .subscribe(
      response =>{
        console.log(response)
        this.dataSource = new MatTableDataSource<Task>(response);
        this.tasks = response
      }
    )
  }

  deleteTask(id:number){
    this.todoListService.deleteTask(id)
    .pipe(takeUntil(this.onDestroy$))
    .subscribe(
      response =>{
        this.getTaskall()
      }
    )
  }

  maskCompletedTask(id:number,completed:boolean){
    let requestBodyUpdateComplete:RequestBodyComplete = {id:id,completed:!completed};
    this.todoListService.maskCompletedTask(requestBodyUpdateComplete)
    .pipe(takeUntil(this.onDestroy$))
    .subscribe(
      response =>{
        this.getTaskall()
      }
    )
  }

  createTask(){
    this.dialogService.createTaskDialog("280px","auto")
    .pipe(takeUntil(this.onDestroy$))
    .subscribe(
      (response:any) =>{
        this.todoListService.createTask(response.task)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(
          response =>{
            this.getTaskall()
          }
        )
      }
    )

  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }


}



