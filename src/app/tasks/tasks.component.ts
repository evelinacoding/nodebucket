/**
 * Title: tasks.component.ts
 * Author: Evelyn Zepeda
 * Date: 6/27/24
 */

//Import statements
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { TaskService } from './task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from './item.interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export interface Employee {
  empId: number;
  todo: Item[];
  done: Item[];
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

// Exporting the task component class
export class TasksComponent {
  // Variables for the app
  empId: number;
  employee: Employee;
  todo: Item[];
  done: Item[];

  errorMessage: string;
  successMessage: string;

  //Validates the form
  newTaskForm: FormGroup = this.fb.group({
    text: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])]
  });

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private taskService: TaskService,
    private fb: FormBuilder
  ) {
    this.empId = parseInt(this.cookieService.get('session_user'), 10);
    this.employee = {} as Employee;
    this.todo = [];
    this.done = [];
    this.errorMessage = '';
    this.successMessage = '';

    this.loadTasks();
  }

  //A function that loads the tasks
  loadTasks() {
    this.taskService.getTasks(this.empId).subscribe({
      next: (emp: any) => {
        this.employee = emp;
        this.todo = this.employee.todo || [];
        this.done = this.employee.done || [];
      },
      //Logs an error if incorrect
      error: (err) => {
        console.log('error', err);
        this.errorMessage = err.message;
        this.hideAlert();
      },
      complete: () => {
        console.log('Tasks loaded successfully');
      }
    });
  }

  //Creates a task
  createTask(form: NgForm) {
    if (form.valid) {
      const todoTask = form.value.task;

      this.taskService.addTask(this.empId, todoTask).subscribe({
        next: (result: any) => {
          const newTodoItem = {
            _id: result.id,
            text: todoTask
          };
          this.todo.push(newTodoItem);
        },
        error: (err) => {
          console.error('Unable to create task for employee ' + this.empId, err);
        }
      });
    }
  }

  // A function that deletes the tasks by taskId
  deleteTask(taskId: string) {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    this.taskService.deleteTask(this.empId, taskId).subscribe({
      next: (res: any) => {
        this.todo = this.todo.filter(t => t._id.toString() !== taskId);
        this.done = this.done.filter(t => t._id.toString() !== taskId);
        this.successMessage = 'Task deleted successfully!';
        this.hideAlert();
      },
      error: (err) => {
        console.log('error', err);
        this.errorMessage = err.message;
        this.hideAlert();
      }
    });
  }

  // Drag and drop functionality
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.updateTaskList();
  }

  // Updates the task list
  updateTaskList() {
    this.taskService.updateTask(this.empId, this.todo, this.done).subscribe({
      next: (res: any) => {
        // Logs an okay message if the function is successful
        console.log('Tasks updated successfully');
      },
      // Logs an error if not successful
      error: (err) => {
        console.log('error', err);
        this.errorMessage = err.message;
        this.hideAlert();
      }
    });
  }

  hideAlert() {
    setTimeout(() => {
      this.errorMessage = '';
      this.successMessage = '';
    }, 3000);
  }
}
