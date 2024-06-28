/**
 * Title: tasks-routing.module.ts
 * Author: Evelyn Zepeda
 * Date: 6/27/24
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks.component';

//The task component route
const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    children: [
      {
        path: 'my-tasks',
        component: TasksComponent,
        title: 'Nodebucket: My Tasks'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

//Exports the TaskRoutingModule
export class TaskRoutingModule { }
