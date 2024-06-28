/**
 * Title: signin.component.spec.ts
 * Author: Evelyn Zepeda
 * Date: 6/27/24
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

//Exports the security service
export class SecurityService {

  constructor(private http: HttpClient) { }

  //Finds the employee by Id with a get request
  findEmployeeById(empId: number) {
    return this.http.get('/api/employees/' + empId)
  }
}
