import {Routes} from '@angular/router';
import { UsuarioComponent } from './nomina/usuario/usuario.component';
import { RolesComponent } from './nomina/roles/roles.component';
import { AreaComponent } from './catalogos/area/area.component';
import { DepartamentoComponent } from './catalogos/departamento/departamento.component';
import { CargoComponent } from './catalogos/cargo/cargo.component';
import { ColaboradorComponent } from './nomina/colaborador/colaborador.component';
import { ColaboradorareaComponent } from './nomina/colaboradorarea/colaboradorarea.component';
import {ContribuyenteComponent} from './catalogos/contribuyente/contribuyente.component';
import {TipoemisorComponent} from './catalogos/tipoemisor/tipoemisor.component';
import {TipoidentificacionComponent} from './catalogos/tipoidentificacion/tipoidentificacion.component';
import {ProveedorComponent} from './compras/proveedor/proveedor.component';
import {PresupuestoComponent} from './compras/presupuesto/presupuesto.component';
import {PaisComponent} from './localizacion/pais/pais.component';
import {CiudadComponent} from './localizacion/ciudad/ciudad.component';
import {BodegaComponent} from './bodega/bodega/bodega.component';
import {TipomovimientoComponent} from './bodega/tipomovimiento/tipomovimiento.component';
import { OrdenpedidoComponent } from './compras/ordenpedido/ordenpedido.component';
import {BodegatmovimientoComponent} from './bodega/bodegatmovimiento/bodegatmovimiento.component';
import {UsuariotmovimientoComponent} from './nomina/usuariotmovimiento/usuariotmovimiento.component';
import {UsuariobodegaComponent} from './nomina/usuariobodega/usuariobodega.component';
import { BorradorComponent } from "./compras/listaopedido/borrador/borrador.component";
import { ListaComponent } from "./compras/listaopedido/borrador/lista/lista.component";
import { VisualizarComponent } from './compras/listaopedido/borrador/visualizar/visualizar.component';
import { AutorizarComponent } from './compras/listaopedido/autorizar/autorizar.component';
import {TipodocumentoComponent} from './catalogos/tipodocumento/tipodocumento.component';
import {TipomovimientoreversoComponent} from './bodega/tipomovimientoreverso/tipomovimientoreverso.component';
import { NuevacotizacionComponent } from './compras/cotizacion/nuevacotizacion/nuevacotizacion.component';
import { ListaprovcotizacionComponent } from './compras/cotizacion/listacotizacion/listacotizacion.component';
import { AsignarprovComponent } from './compras/cotizacion/listacotizacion/asignarprov/asignarprov.component';


export const ModulosRoutes: Routes = [
  //#region Nómina
  {
    path: "nomina/usuario",
    component: UsuarioComponent,
    data: { title: "Configuración Nomina", breadcrumb: "CONFIGURACIÓN USUARIO" }
  },
  {
    path: "nomina/roles",
    component: RolesComponent,
    data: { title: "Configuración Nomina", breadcrumb: "CONFIGURACIÓN ROLES" }
  },
  {
    path: "nomina/colaborador",
    component: ColaboradorComponent,
    data: {
      title: "Configuración Colaborador",
      breadcrumb: "CONFIGURACIÓN COLABORADOR"
    }
  },
  {
    path: "nomina/colaboradorarea",
    component: ColaboradorareaComponent,
    data: {
      title: "Asignar Área-Colaborador",
      breadcrumb: "ASIGNAR ÁREA-COLABORADOR"
    }
  },
  {
    path: 'nomina/usuariotmovimiento',
    component: UsuariotmovimientoComponent,
    data: {title: 'Usuario - Tipo Movimiento', breadcrumb: 'Usuario - Tipo Movimiento'}
  },
  {
    path: 'nomina/usuariobodega',
    component: UsuariobodegaComponent,
    data: {title: 'Usuario - Bodega', breadcrumb: 'Usuario - Bodega'}
  },
  //#endregion

  //#region Catálogos
  {
    path: "catalogos/contribuyente",
    component: ContribuyenteComponent,
    data: {
      title: "Configuración Contribuyente",
      breadcrumb: "CONFIGURACIÓN CONTRIBUYENTE"
    }
  },
  {
    path: "catalogos/tipoemisor",
    component: TipoemisorComponent,
    data: {
      title: "Configuración Tipo Emisor",
      breadcrumb: "CONFIGURACIÓN TIPO EMISOR"
    }
  },
  {
    path: "catalogos/tipoidentificacion",
    component: TipoidentificacionComponent,
    data: {
      title: "Configuración Tipo Identificación",
      breadcrumb: "CONFIGURACIÓN TIPO IDENTIFICACIÓN"
    }
  },
  {
    path: "catalogos/tipodocumento",
    component: TipodocumentoComponent,
    data: {
      title: "Configuración Tipo Documento",
      breadcrumb: "CONFIGURACIÓN TIPO DOCUMENTO"
    }
  },
  {
    path: "catalogos/area",
    component: AreaComponent,
    data: { title: "Configuración Área", breadcrumb: "CONFIGURACIÓN ÁREA" }
  },
  {
    path: "catalogos/departamento",
    component: DepartamentoComponent,
    data: {
      title: "Configuración Departamento",
      breadcrumb: "CONFIGURACIÓN DEPARTAMENTO"
    }
  },
  {
    path: "catalogos/cargo",
    component: CargoComponent,
    data: { title: "Configuración Cargo", breadcrumb: "CONFIGURACIÓN CARGO" }
  },

  //#endregion

  //#region Compras
  {
    path: "compras/proveedor",
    component: ProveedorComponent,
    data: {
      title: "Configuración Proveedor",
      breadcrumb: "CONFIGURACIÓN PROVEEDOR"
    }
  },
  {
    path: "compras/presupuesto",
    component: PresupuestoComponent,
    data: {
      title: "Compras -> Presupuesto",
      breadcrumb: "CONFIGURACIÓN PRESUPUESTO"
    }
  },
  {
    path: "compras/listaopedido/borrador/nueva",
    component: OrdenpedidoComponent,
    data: {
      title: "Compras -> Orden Pedido",
      breadcrumb: "CONFIGURACIÓN ORDEN PEDIDO"
    }
  },
  {
    path: "compras/listaopedido/borrador",
    component: BorradorComponent,
    data: {
      title: "Compras -> Listas de Orden Pedido",
      breadcrumb: "CONFIGURACIÓN LISTAS DE ORDEN PEDIDO"
    }
  },
  {
    path: "compras/listaopedido/borrador/lista/:id",
    component: ListaComponent,
    data: {
      title: "Compras -> Editar Orden Pedido",
      breadcrumb: "EDITAR ORDEN DE PEDIDO"
    }
  },
  {
    path: "compras/listaopedido/borrador/visualizar/:id",
    component: VisualizarComponent,
    data: {
      title: "Compras -> Ver Orden Pedido",
      breadcrumb: "VER ORDEN DE PEDIDO"
    }
  },
  {
    path: "compras/listaopedido/autorizar",
    component: AutorizarComponent,
    data: {
      title: "Compras -> Autorizar Orden Pedido",
      breadcrumb: "AUTORIZAR ORDEN DE PEDIDO"
    }
  },
  {
    path: "compras/listaopedido/autorizar/visualizar/:id/:bandera",
    component: VisualizarComponent,
    data: {
      title: "Compras -> Ver Orden Pedido",
      breadcrumb: "VER ORDEN DE PEDIDO"
    }
  },
  {
    path: "compras/cotizacion/lista/nueva",
    component: NuevacotizacionComponent,
    data: { title: "Cotización", breadcrumb: "NUEVA COTIZACIÓN" }
  },
 
  {
    path: "compras/cotizacion/lista",
    component: ListaprovcotizacionComponent,
    data: { title: "Cotización", breadcrumb: "ASIGNAR PROVEEDORES COTIZACIÓN" }
  },
  {
    path: "compras/cotizacion/lista/visualizar/:id",
    component: AsignarprovComponent,
    data: { title: "Cotización", breadcrumb: "ASIGNAR PROVEEDORES  COTIZACIÓN" }
  },

  //#endregion

  //#region Localización
  {
    path: "localizacion/pais",
    component: PaisComponent,
    data: { title: "Localización País", breadcrumb: "LOCALIZACIÓN - PAÍS" }
  },
  {
    path: "localizacion/ciudad",
    component: CiudadComponent,
    data: {
      title: "Localización Ciudad -> Presupuesto",
      breadcrumb: "LOCALIZACIÓN CIUDAD"
    }
  },
  //#endregion

  //#region Bodega
  {
    path: "bodega/bodega",
    component: BodegaComponent,
    data: { title: "Bodega", breadcrumb: "CONFIGURACIÓN BODEGA" }
  },
  {
    path: "bodega/tipomovimiento",
    component: TipomovimientoComponent,
    data: {
      title: "Tipo Movimiento",
      breadcrumb: "CONFIGURACIÓN TIPO MOVIMIENTO"
    }
  },
  {
    path: "bodega/bodegatmovimiento",
    component: BodegatmovimientoComponent,
    data: {title: 'Bodega - Tipo Movimiento', breadcrumb: 'Bodega - Tipo Movimiento'}
  },
  {
    path: "bodega/tmovimientoreverso",
    component: TipomovimientoreversoComponent,
    data: {title: 'T. Movimiento - Reverso', breadcrumb: 'T. Movimiento - Reverso'}
  },
  //#endregion

  
];
