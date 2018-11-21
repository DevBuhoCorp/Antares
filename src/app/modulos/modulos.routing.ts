import {Routes} from '@angular/router';
import { UsuarioComponent } from './nomina/usuario/usuario.component';
import { RolesComponent } from './nomina/roles/roles.component';
import { AreaComponent } from './catalogos/area/area.component';
import { DepartamentoComponent } from './catalogos/departamento/departamento.component';


export const ModulosRoutes: Routes = [

  {
    path: 'nomina/usuario',
    component: UsuarioComponent,
    data: {title: 'Configuración Nomina', breadcrumb: 'CONFIGURACIÓN USUARIO'}
  },
  {
    path: 'nomina/roles',
    component: RolesComponent,
    data: {title: 'Configuración Nomina', breadcrumb: 'CONFIGURACIÓN ROLES'}
  },
  {
    path: 'catalogos/area',
    component: AreaComponent,
    data: {title: 'Configuración Área', breadcrumb: 'CONFIGURACIÓN ÁREA'}
  },
  {
    path: 'catalogos/departamento',
    component: DepartamentoComponent,
    data: {title: 'Configuración Departamento', breadcrumb: 'CONFIGURACIÓN DEPARTAMENTO'}
  },
  

];
