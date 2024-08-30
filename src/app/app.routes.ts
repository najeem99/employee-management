import { Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    {
        path: "employee-details",
        title: "Employee Details",
        component: EmployeeDetailsComponent,
       },
    {
        path: "about",
        title: "About",
        component: AboutComponent,
       },
       {
        path: "",
        redirectTo: "employee-details",
        pathMatch: "full",
      },

];
