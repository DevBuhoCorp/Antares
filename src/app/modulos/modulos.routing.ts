import {Routes} from '@angular/router';
import { UsuarioComponent } from './nomina/usuario/usuario.component';
import { RolesComponent } from './nomina/roles/roles.component';
import { AreaComponent } from './catalogos/area/area.component';
import { DepartamentoComponent } from './catalogos/departamento/departamento.component';
import {ContribuyenteComponent} from './catalogos/contribuyente/contribuyente.component';
import {TipoemisorComponent} from './catalogos/tipoemisor/tipoemisor.component';
import {TipoidentificacionComponent} from './catalogos/tipoidentificacion/tipoidentificacion.component';
import {ProveedorComponent} from './compras/proveedor/proveedor.component';


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
  {
    path: 'catalogos/contribuyente',
    component: ContribuyenteComponent,
    data: {title: 'Configuración Contribuyente', breadcrumb: 'CONFIGURACIÓN CONTRIBUYENTE'}
  },
  {
    path: 'catalogos/tipoemisor',
    component: TipoemisorComponent,
    data: {title: 'Configuración Tipo Emisor', breadcrumb: 'CONFIGURACIÓN TIPO EMISOR'}
  },
  {
    path: 'catalogos/tipoidentificacion',
    component: TipoidentificacionComponent,
    data: {title: 'Configuración Tipo Identificación', breadcrumb: 'CONFIGURACIÓN TIPO IDENTIFICACIÓN'}
  },
  {
    path: 'compras/proveedor',
    component: ProveedorComponent,
    data: {title: 'Configuración Proveedor', breadcrumb: 'CONFIGURACIÓN PROVEEDOR'}
  },

];
