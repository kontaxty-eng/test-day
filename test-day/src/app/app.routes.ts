import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'weeks-schedule', pathMatch: 'full' },
    {
        path: 'weeks-schedule',
        loadComponent: () => import('./pages/weeks-schedule/weeks-schedule').then(m => m.WeeksSchedulePage)
    },
    { path: '**', redirectTo: 'weeks-schedule' }
];
