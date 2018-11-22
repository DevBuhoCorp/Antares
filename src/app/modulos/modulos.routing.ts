import {Routes} from '@angular/router';
import { UsuarioComponent } from './nomina/usuario/usuario.component';
import { RolesComponent } from './nomina/roles/roles.component';
import { AreaComponent } from './catalogos/area/area.component';
import { DepartamentoComponent } from './catalogos/departamento/departamento.component';
import { CargoComponent } from './catalogos/cargo/cargo.component';
import { ColaboradorComponent } from './nomina/colaborador/colaborador.component';
import { ColaboradorareaComponent } from './nomina/colaboradorarea/colaboradorarea.component';


export const ModulosRoutes: Routes = [

  //#region Nómina
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
    path: 'nomina/colaborador',
    component: ColaboradorComponent,
    data: {title: 'Configuración Colaborador', breadcrumb: 'CONFIGURACIÓN COLABORADOR'}
  },
  {
    path: 'nomina/colaboradorarea',
    component: ColaboradorareaComponent,
    data: {title: 'Asignar Área-Colaborador', breadcrumb: 'ASIGNAR ÁREA-COLABORADOR'}
  },
  //#endregion
  
  //#region Catálogos
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
  {
    path: 'catalogos/cargo',
    component: CargoComponent,
    data: {title: 'Configuración Cargo', breadcrumb: 'CONFIGURACIÓN CARGO'}
  },
  
  //#endregion

];
