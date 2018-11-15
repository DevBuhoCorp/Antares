import {Routes} from '@angular/router';
import {AuthLayoutComponent} from './shared/componentes/layouts/auth-layout/auth-layout.component';
import {AuthGuard} from './shared/servicios/auth/auth.guard';
import {AdminLayoutComponent} from './shared/componentes/layouts/admin-layout/admin-layout.component';
import {AdminGuard} from './shared/servicios/auth/admin.guard';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'sesiones/signin',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'sesiones',
        loadChildren: './vistas/sesiones/sesiones.module#SesionesModule',
        data: {title: 'Session'}
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: './vistas/dashboard/dashboard.module#DashboardModule',
        data: {title: 'Dashboard', breadcrumb: 'DASHBOARD'}
      },
      {
        path: 'inbox',
        loadChildren: './vistas/app-inbox/app-inbox.module#AppInboxModule',
        data: {title: 'Inbox', breadcrumb: 'INBOX'}
      },
      {
        path: 'profile',
        loadChildren: './vistas/profile/profile.module#ProfileModule',
        data: {title: 'Profile', breadcrumb: 'Perfil'}
      },
      {
        path: 'calendar',
        loadChildren: './vistas/app-calendar/app-calendar.module#AppCalendarModule',
        data: {title: 'Calendar', breadcrumb: 'CALENDAR'}
      },
      {
        path: 'modulos',
        loadChildren: './modulos/modulos.module#ModulosModule',
        data: {title: 'Modulos', breadcrumb: 'MODULOS'}
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'sesiones/404'
  }
];

