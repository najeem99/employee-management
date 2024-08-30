import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import myConfig from '../../../assets/employee.json'
import { Employee } from '../models/employee';
import { ReplaySubject } from 'rxjs';
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeeArray: Employee[] = myConfig;
  employeeDataSubject: ReplaySubject<Employee[]> = new ReplaySubject<Employee[]>();

  constructor(public http: HttpClient, private toastr: ToastrService) {
    this.employeeDataSubject.next(this.employeeArray)
  }

  addEmployee(data: Employee) {
    console.log(data)
    this.employeeArray.push(data);
    this.employeeDataSubject.next(this.employeeArray);
    console.log("Employee Added Successfully")
    this.toastr.success("Employee Added Successfully");
  }
  checkIfEmployeeIDExists(employeeCode: string): boolean {
    let idExists:boolean = false;
     const a = this.employeeArray.some((x: Employee) => {
      if(x.employeeCode === employeeCode) {
        idExists =  true;
      }
    })
    return idExists;
  }
  getEmployeeByIndex(index:number):Employee{
    return this.employeeArray[index]
  }
}
