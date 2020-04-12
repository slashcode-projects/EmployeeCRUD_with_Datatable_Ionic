import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./Employee/employee-details/employee-details.module').then(m => m.EmployeeDetailsPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'AddEmployee',
    loadChildren: () => import('./Employee/add-employee/add-employee.module').then(m => m.AddEmployeePageModule)
  },
  {
    path: 'UpdateEmployee/:id',
    loadChildren: () => import('./Employee/add-employee/add-employee.module').then(m => m.AddEmployeePageModule)
  },
  { path: 'employee-details', loadChildren: './Employee/employee-details/employee-details.module#EmployeeDetailsPageModule' },
  { path: 'add-employee', loadChildren: './Employee/add-employee/add-employee.module#AddEmployeePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
