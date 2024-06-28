/*
Title: task.service.ts
Author: Evelyn Zepeda/Professor Krasso
Date: 6/27/24
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item.interface'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  /**
   * Description: getTasks function to retrieve all tasks for an employee by employeeId
   * @param empId employee id
   * @returns list of tasks
   */

  getTasks(empId:number) {
    return this.http.get('/api/employees/' + empId + '/tasks')
  }

  /**
   * Description createTask function to create a new task for an employee by employeeId
   * @param empId employee id
   * @param task task to add
   * @returns status code 204 (no content)
   */

  addTask(empId: number, text:string) {
    return this.http.post('/api/employees/' + empId + '/tasks', { text })
  }

  /**
   * @description deleteTask function to delete a task for an employee by employeeId and taskId
   * @param empId
   * @param taskId
   * @returns status code 204 (no content)
   */

  deleteTask(empId: number, taskId: string) {
    console.log('/api/employees/' + empId + '/tasks/' + taskId) //log the task id to the console
    return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId)
  }

  /**
   * @description updateTask function to update a task for an employee by employeeId
   * @param empId
   * @param todo list of tasks to do
   * @param done list of tasks done
   * @returns status code 204 (no content)
   */

  updateTask(empId: number, todo: Item[], done: Item[]) {
    return this.http.put('/api/employees/' + empId + '/tasks', {
      todo,
      done
    })
  }
}
