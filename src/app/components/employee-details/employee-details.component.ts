import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CustomTableComponent } from '../custom-table/custom-table.component';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
const ELEMENT_DATA: Employee[] = [];

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
  providers: [EmployeeService]
})
export class EmployeeDetailsComponent implements OnInit {
  dialog = inject(MatDialog);
  employeeData: Employee[] = []
  constructor(public employeeService: EmployeeService, private cdr: ChangeDetectorRef) {

  }
  ngOnInit(): void {
    this.employeeService.employeeDataSubject.subscribe(empData => {
      console.log(empData)
      this.employeeData = JSON.parse(JSON.stringify(empData));
      this.cdr.detectChanges();
    })
  }
  dataSource = ELEMENT_DATA;

  openEmployeeDialog(existingData?: any) {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      data: {
        dialogMode: existingData ? 'EDIT' : 'NEW',
        existingData: existingData || null
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if(result?.event == "update"){
        this.employeeService.updateEmployee(result.data.value);

      }else{
        this.employeeService.addEmployee(result.data.value);
      }
    });

  }
}


