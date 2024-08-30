import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogRef, } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { employeeCodeValidator } from '../../helper/employeeCodeValidator';
@Component({
  selector: 'app-employee-dialog',
  standalone: true,
  imports: [MatDialogTitle, ReactiveFormsModule, MatDialogContent, MatInputModule, MatSelectModule, MatFormFieldModule, MatButtonModule, CommonModule],
  templateUrl: './employee-dialog.component.html',
  styleUrl: './employee-dialog.component.scss'
})
export class EmployeeDialogComponent {

  employeeForm: FormGroup;
  employeeCodeReadOnly: boolean = false;
  grades: string[] = ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5']; // Updated levels

  // Validation states for rules
  isFirstCharValid: boolean = false;
  areDigitsValid: boolean = false;
  areNextCharsValid: boolean = false;
  isLengthValid: boolean = false;
  departments: string[] = ['Engineering', 'Human Resources', 'Finance', 'Marketing', 'IT', 'Sales', 'Legal', 'Product Management', 'Customer Support', 'Design'];

  constructor(private dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public employeeService: EmployeeService) {
    this.employeeForm = this.fb.group({
      employeeCode: ['', [Validators.required, employeeCodeValidator()]], // Use custom validator
      employeeFirstName: ['', Validators.required],
      employeeMiddleName: [''],
      employeeLastName: ['', Validators.required],
      departmentName: ['', Validators.required],
      grade: ['', Validators.required],
      reportingManager: ['', Validators.required],
      skills: [[], Validators.required], // assuming skills is a multi-select
      basicSalary: ['', [Validators.required, Validators.min(0)]],
      houseRent: ['', [Validators.required, Validators.min(0)]],
      otherAllowance: ['', [Validators.required, Validators.min(0)]]
    });
    console.log(this.data.dialogMode)
    if (this.data.dialogMode == 'EDIT') {
      this.fetchData(this.data.existingData);
    }
  }
  onSubmit() {
    if (this.data.dialogMode == 'EDIT') {
      this.dialogRef.close(
        { event: 'update', data: this.employeeForm }
      );

    } else if (!this.employeeService.checkIfEmployeeIDExists(this.employeeForm.value.employeeCode)) {
      this.dialogRef.close(
        { event: 'add', data: this.employeeForm }
      );

    } else {
      console.error('ID Already Exists')
    }

  }
  fetchData(dataIndex: any) {
    this.employeeForm.patchValue(dataIndex);
    this.employeeCodeReadOnly = true
    this.validateEmployeeCode()
  }
  validateEmployeeCode() {
    const code = this.employeeForm.get('employeeCode')?.value || '';

    this.isFirstCharValid = /^[A-Z#]/.test(code);
    this.areDigitsValid = /\b[A-Z#][0-9]{3,4}/.test(code);
    this.areNextCharsValid = /\b[A-Z#][0-9]{3,4}[A-Z]{2}/.test(code);
    this.isLengthValid = (code.length === 8 && /\d$/.test(code)) || (code.length === 10 && /\d{2}$/.test(code));
  }
  getSalaryPerMonth(): number {
    const basicSalary = this.employeeForm.get('basicSalary')?.value || 0;
    const houseRent = this.employeeForm.get('houseRent')?.value || 0;
    const otherAllowance = this.employeeForm.get('otherAllowance')?.value || 0;

    return basicSalary + houseRent + otherAllowance;
  }
  getSalaryPerYear(): number {
    const basicSalary = this.employeeForm.get('basicSalary')?.value || 0;
    const houseRent = this.employeeForm.get('houseRent')?.value || 0;
    const otherAllowance = this.employeeForm.get('otherAllowance')?.value || 0;

    return (basicSalary + houseRent + otherAllowance) * 12;
  }

}

