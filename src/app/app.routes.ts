import { Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';

export const routes: Routes = [
    {
        path: "employee-details",
        title: "Employee Details",
        component: EmployeeDetailsComponent,
       },
       {
        path: "",
        redirectTo: "employee-details",
        pathMatch: "full",
      },

];
