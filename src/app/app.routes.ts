import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'calculator',
    loadComponent: () =>
      import('@/calculator/views/calculator/calculator.component'),
  },
  {
    path: '**',
    redirectTo: 'calculator'
  }
];
