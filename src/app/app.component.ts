import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatSidenavModule,MatListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'employee-management';
}
