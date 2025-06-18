import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';

export const routes: Routes = [
  // When the user visits the root URL ('/'), load the DashboardComponent.
  { path: '', component: DashboardComponent },
  // A "wildcard" route to redirect any other URL back to the home page.
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
